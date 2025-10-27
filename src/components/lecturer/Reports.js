import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Reports = () => {
  const [form, setForm] = useState({
    faculty_name: 'Faculty of Information Communication Technology',
    class_id: '',
    week: '',
    date: '',
    course_id: '',
    actual_students_present: '',
    venue: '',
    scheduled_time: '',
    topic_taught: '',
    learning_outcomes: '',
    recommendations: ''
  });
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [chartData, setChartData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('/api/courses', { headers }).then(res => setCourses(res.data));
    axios.get('/api/classes', { headers }).then(res => setClasses(res.data));
    axios.get('/api/reports', { headers }).then(res => {
      setReports(res.data);
      updateChartData(res.data);
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.faculty_name) newErrors.faculty_name = 'Required';
    if (!form.class_id) newErrors.class_id = 'Required';
    if (!form.week || form.week < 1) newErrors.week = 'Must be a positive number';
    if (!form.date) newErrors.date = 'Required';
    if (!form.course_id) newErrors.course_id = 'Required';
    if (
      form.actual_students_present === '' ||
      isNaN(form.actual_students_present) ||
      form.actual_students_present < 0
    )
      newErrors.actual_students_present = 'Must be a non-negative number';
    if (!form.venue) newErrors.venue = 'Required';
    if (!form.scheduled_time) newErrors.scheduled_time = 'Required';
    if (!form.topic_taught) newErrors.topic_taught = 'Required';
    if (!form.learning_outcomes) newErrors.learning_outcomes = 'Required';
    if (!form.recommendations) newErrors.recommendations = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setForm({ ...form, course_id: courseId });
    const selectedCourse = courses.find(c => c.id == courseId);
    if (selectedCourse) setTotalStudents(selectedCourse.total_registered_students);
  };

  const handleClassChange = (e) => {
    setForm({ ...form, class_id: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post('/api/reports', form, { headers });
      alert('Report submitted');
      const res = await axios.get('/api/reports', { headers });
      setReports(res.data);
      updateChartData(res.data);
      setForm({
        faculty_name: 'Faculty of Information Communication Technology',
        class_id: '',
        week: '',
        date: '',
        course_id: '',
        actual_students_present: '',
        venue: '',
        scheduled_time: '',
        topic_taught: '',
        learning_outcomes: '',
        recommendations: ''
      });
      setTotalStudents(0);
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/search/reports?query=${searchQuery}`, { headers });
      setReports(res.data);
      updateChartData(res.data);
    } catch (err) {
      alert('Search failed');
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      await axios.delete(`/api/reports/${reportId}`, { headers });
      alert('Report deleted');
      const updatedReports = reports.filter(r => r.id !== reportId);
      setReports(updatedReports);
      updateChartData(updatedReports);
    } catch (err) {
      alert('Failed to delete report');
    }
  };

  const updateChartData = (reportsData) => {
    const dataMap = {};
    reportsData.forEach(report => {
      if (report.week && report.actual_students_present !== undefined) {
        dataMap[report.week] = report.actual_students_present;
      }
    });
    const sortedWeeks = Object.keys(dataMap).sort((a, b) => a - b);
    const dataPoints = sortedWeeks.map(w => dataMap[w]);

    setChartData({
      labels: sortedWeeks,
      datasets: [
        {
          label: 'Students Present',
          data: dataPoints,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          tension: 0.4
        }
      ]
    });
  };

  return (
    <div className="container mt-5">
      <h3>Submit Lecture Report</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Faculty Name</label>
          <input
            type="text"
            className="form-control"
            value={form.faculty_name}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Class Name</label>
          <select
            className={`form-select ${errors.class_id ? 'is-invalid' : ''}`}
            name="class_id"
            value={form.class_id}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.class_name}
              </option>
            ))}
          </select>
          {errors.class_id && <div className="invalid-feedback">{errors.class_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Week of Reporting</label>
          <input
            type="number"
            className={`form-control ${errors.week ? 'is-invalid' : ''}`}
            name="week"
            value={form.week}
            onChange={handleChange}
            min="1"
          />
          {errors.week && <div className="invalid-feedback">{errors.week}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Lecture</label>
          <input
            type="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <select
            className={`form-select ${errors.course_id ? 'is-invalid' : ''}`}
            name="course_id"
            value={form.course_id}
            onChange={handleCourseChange}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.course_id && <div className="invalid-feedback">{errors.course_id}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Total Registered Students</label>
          <input
            type="number"
            className="form-control"
            value={totalStudents}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Actual Number of Students Present</label>
          <input
            type="number"
            className={`form-control ${errors.actual_students_present ? 'is-invalid' : ''}`}
            name="actual_students_present"
            value={form.actual_students_present}
            onChange={handleChange}
            min="0"
          />
          {errors.actual_students_present && (
            <div className="invalid-feedback">{errors.actual_students_present}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Venue of the Class</label>
          <input
            type="text"
            className={`form-control ${errors.venue ? 'is-invalid' : ''}`}
            name="venue"
            value={form.venue}
            onChange={handleChange}
          />
          {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Scheduled Lecture Time</label>
          <input
            type="time"
            className={`form-control ${errors.scheduled_time ? 'is-invalid' : ''}`}
            name="scheduled_time"
            value={form.scheduled_time}
            onChange={handleChange}
          />
          {errors.scheduled_time && (
            <div className="invalid-feedback">{errors.scheduled_time}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Topic Taught</label>
          <input
            type="text"
            className={`form-control ${errors.topic_taught ? 'is-invalid' : ''}`}
            name="topic_taught"
            value={form.topic_taught}
            onChange={handleChange}
          />
          {errors.topic_taught && <div className="invalid-feedback">{errors.topic_taught}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Learning Outcomes of the Topic</label>
          <textarea
            className={`form-control ${errors.learning_outcomes ? 'is-invalid' : ''}`}
            name="learning_outcomes"
            value={form.learning_outcomes}
            onChange={handleChange}
          />
          {errors.learning_outcomes && (
            <div className="invalid-feedback">{errors.learning_outcomes}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Lecturer’s Recommendations</label>
          <textarea
            className={`form-control ${errors.recommendations ? 'is-invalid' : ''}`}
            name="recommendations"
            value={form.recommendations}
            onChange={handleChange}
          />
          {errors.recommendations && (
            <div className="invalid-feedback">{errors.recommendations}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Report
        </button>
      </form>

      <h4 className="mt-5">Search Reports</h4>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Course or Topic"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <h4>Existing Reports</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Week</th>
            <th>Date</th>
            <th>Lecturer</th>
            <th>Topic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No reports found.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.week}</td>
                <td>{report.date}</td>
                <td>{report.lecturer_name}</td>
                <td>{report.topic_taught}</td>
                <td>
                  <a
                    href={`/api/reports/${report.id}/excel`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Download
                  </a>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      alert('Edit functionality not implemented in this snippet.');
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h4 className="mt-5">Students Present Over Weeks</h4>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
};

export default Reports;
