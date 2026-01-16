import { useEffect, useState } from "react";
import { Calendar, MapPin, Upload, Trophy, Users, FileText, ArrowLeftIcon } from "lucide-react";
import { useEventStore } from "../../stores/useEventStore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateEventPage() {
    const{user} = useAuth()
    const{formData, setFormData, resetFormData, createEvent} = useEventStore();
    const [posterPreview, setPosterPreview] = useState(null)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if(type === 'file'){
        const file = e.target.files[0]
        setFormData({...formData, poster_img_file: file})
        setPosterPreview(URL.createObjectURL(file))
        return
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // setFormData({...formData, name: value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
       ...formData,
       created_by_member_id: user.member_id,
      //  start_datetime: new Date(formData.start_datetime).toISOString(),
      //  end_datetime: new Date(formData.end_datetime).toISOString(),
    })
    await createEvent();
    navigate("/admin/events");
    resetFormData();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick = {() =>{navigate("/admin/events")}}className='btn btn-ghost mb-8'>
        <ArrowLeftIcon className='size-4 mr-2'/>
        Back to events page
      </button>
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary">Create New Event</h2>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FileText size={18} /> Title
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Event title"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Type</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="general">General</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="social">Social</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Describe the event"
              />
            </div>

            {/* Location */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <MapPin size={18} /> Location
                </span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Event location"
              />
            </div>

            {/* Start & End datetime */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Calendar size={18} /> Start
                  </span>
                </label>
                <input
                  type="datetime-local"
                  name="start_datetime"
                  value={formData.start_datetime}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Calendar size={18} /> End
                  </span>
                </label>
                <input
                  type="datetime-local"
                  name="end_datetime"
                  value={formData.end_datetime}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Points */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Trophy size={18} /> Points
                </span>
              </label>
              <input
                type="number"
                name="point_value"
                value={formData.point_value}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="0"
              />
            </div>

            {/* Poster */}
            <div>
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Upload size={18} /> Poster Image URL
                </span>
              </label>
              <input
                type="file"
                name="poster_img_file"
                // value={formData.poster_img_url}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"

              />
              {posterPreview && (
                <img
                  src={posterPreview}
                  alt="Poster Preview"
                  className="mt-3 rounded-lg shadow-md w-48 h-32 object-cover border border-base-200"
                />
              )}
            </div>

            {/* Max Attendee */}
            <div className="form-control">
              <label className="cursor-pointer flex items-center gap-3">
                <input
                  type="checkbox"
                  name="max_attendee"
                  checked={formData.max_attendee}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text flex items-center gap-2">
                  <Users size={18} /> Has max attendee limit
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading||!formData.title||!formData.location}
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
