import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapFocusController = ({ students, teacherLocation }) => {
    const map = useMap();
    useEffect(() => {
        const points = [];
        if (students && students.length > 0) {
            students.forEach(s => {
                // רק אם יש מיקום הגיוני (לא 0,0)
                if (s.LatDegrees !== 0 || s.LongDegrees !== 0) {
                    const lat = s.LatDegrees + (s.LatMinutes / 60) + (s.LatSeconds / 3600);
                    const lng = s.LongDegrees + (s.LongMinutes / 60) + (s.LongSeconds / 3600);
                    points.push([lat, lng]);
                }
            });
        }
        if (teacherLocation) points.push([teacherLocation.lat, teacherLocation.lng]);
        
        if (points.length > 0) {
            const bounds = L.latLngBounds(points);
            map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
        }
    }, [students, teacherLocation, map]);
    return null;
};

const MapComponent = ({ teacherData }) => {
    const [allStudents, setAllStudents] = useState([]);
    const [teacherLocation, setTeacherLocation] = useState(null);
    const [farStudents, setFarStudents] = useState([]);

    const teacherClassName = (teacherData?.ClassName || teacherData?.className || "").trim();

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const x = lat1 - lat2;
        const y = lon1 - lon2;
        return Math.sqrt(x * x + y * y) * 111;
    };

    useEffect(() => {
        const baseLat = 31.7683;
        const baseLng = 35.2137;
        const latDiff = (Math.random() - 0.5) * 0.01;
        const lngDiff = (Math.random() - 0.5) * 0.01;

        setTeacherLocation({ 
            lat: baseLat + latDiff, 
            lng: baseLng + lngDiff 
        });
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students/locations');
            const data = response.data;
            setAllStudents(data);

            if (teacherLocation && teacherClassName) {
                const myClassAlerts = data.filter(s => {
                    const isMyStudent = (s.ClassName || "").trim() === teacherClassName;
                    if (!isMyStudent) return false;

                    const sLat = s.LatDegrees + (s.LatMinutes / 60) + (s.LatSeconds / 3600);
                    const sLng = s.LongDegrees + (s.LongMinutes / 60) + (s.LongSeconds / 3600);
                    
                    if (s.LatDegrees === 0) return false;

                    return getDistance(teacherLocation.lat, teacherLocation.lng, sLat, sLng) > 3;
                });
                setFarStudents(myClassAlerts);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        fetchLocations();
        const interval = setInterval(fetchLocations, 5000);
        return () => clearInterval(interval);
    }, [teacherLocation, teacherClassName]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px' }}>
            <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
                <h3 style={{ margin: 0 }}>מפת איכון שכבתית - שלום המורה של כיתה {teacherClassName}</h3>
                <small>מציג {allStudents.length} תלמידות סה"כ</small>
            </div>
            
            <div style={{ height: '550px', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '2px solid #ddd' }}>
                <MapContainer style={{ height: '100%', width: '100%' }} center={[31.7683, 35.2137]} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    
                    <MapFocusController students={allStudents} teacherLocation={teacherLocation} />

                    {teacherLocation && (
                        <Marker position={[teacherLocation.lat, teacherLocation.lng]} icon={blueIcon}>
                            <Popup>אני (המורה)</Popup>
                        </Marker>
                    )}

                    {allStudents.map((student, index) => {
                        if (student.LatDegrees === 0 && student.LongDegrees === 0) return null;

                        const lat = student.LatDegrees + (student.LatMinutes / 60) + (student.LatSeconds / 3600);
                        const lng = student.LongDegrees + (student.LongMinutes / 60) + (student.LongSeconds / 3600);
                        
                        const isMyStudent = (student.ClassName || "").trim() === teacherClassName;
                        const isFar = isMyStudent && teacherLocation && getDistance(teacherLocation.lat, teacherLocation.lng, lat, lng) > 3;

                        let markerIcon = greyIcon;
                        if (isMyStudent) {
                            markerIcon = isFar ? redIcon : blueIcon;
                        }

                        return (
                            <Marker key={`${student.StudentID}-${index}`} position={[lat, lng]} icon={markerIcon}>
                                <Popup>
                                    <div style={{ textAlign: 'right', direction: 'rtl' }}>
                                        <strong>{student.FirstName} {student.LastName}</strong><br />
                                        כיתה: {student.ClassName}<br />
                                        {isMyStudent && isFar && <span style={{ color: 'red', fontWeight: 'bold' }}>⚠️ מחוץ לטווח שלך!</span>}
                                        {!isMyStudent && <span style={{ color: 'gray' }}>(כיתה אחרת)</span>}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>

            {farStudents.length > 0 && (
                <div style={{ 
                    backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', 
                    borderRadius: '10px', border: '2px solid #ef4444', direction: 'rtl' 
                }}>
                    <strong>🚨 תלמידות שלך שהתרחקו (כיתה {teacherClassName}):</strong>
                    <ul style={{ margin: '5px 0 0 0' }}>
                        {farStudents.map(s => <li key={s.StudentID}>{s.FirstName} {s.LastName}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MapComponent;