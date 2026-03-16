import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useUserId from '../../../hooks/useUserId';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PiUserCircle } from 'react-icons/pi';
import dayjs from 'dayjs';
import Loader from '../../../components/common/Loader/Loader';

const MyProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const { uid, uidLoading } = useUserId();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: profile = {},
    isLoading: profileLoading,
    isError,
  } = useQuery({
     queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email ,
  }
  );

  const [bio, setBio] = useState('');
  const [degree, setDegree] = useState('');
  const [gpa, setGpa] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setBio(profile.bio || '');
    setDegree(profile.degree || '');
    setGpa(profile.gpa ? String(profile.gpa) : '');
  }, [profile]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/users/${user.email}`, {
        bio,
        degree,
        gpa: gpa ? parseFloat(gpa) : undefined,
      });
      toast.success('Profile updated successfully');
      setIsEditing(false);
      queryClient.invalidateQueries(['profile', user.email]);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  if (roleLoading || uidLoading || profileLoading) return <Loader />;
  if (isError) return <div className="text-center text-error">Failed to load profile</div>;


    return (
      <div className="flex justify-center items-start pt-10 min-h-[60vh]">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200">
          <figure className="px-10 pt-10">
            <div className="avatar placeholder">
              <div className="bg-primary/10 text-primary rounded-full w-32 ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" />
                ) : (
                  <span className="text-5xl font-bold uppercase">
                    {user?.displayName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl font-bold mb-1">
              {user?.displayName}
            </h2>
            <p className="text-base-content/70 font-medium mb-4">
              Email: {user?.email}
            </p>
            {uid && (
              <p className="text-base-content/70 font-medium mb-4">
                User ID: {uid}
              </p>
            )}

            <div className="badge badge-primary badge-lg uppercase font-semibold tracking-wider mb-6 pb-4 pt-4 px-6 rounded-full">
              {role || "Student"}
            </div>

            <div className="w-full mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Profile</h3>
                <button type="button" onClick={handleEditToggle} className="btn btn-sm">
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-3">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="Degree"
                    className="input input-bordered w-full"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="GPA"
                    className="input input-bordered w-full"
                  />
                  <button type="submit" className="btn btn-primary w-full">
                    Save Profile
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <p><strong>Bio:</strong> {profile.bio || 'Not set'}</p>
                  <p><strong>Degree:</strong> {profile.degree || 'Not set'}</p>
                  <p><strong>GPA:</strong> {profile.gpa ?? 'Not set'}</p>
                </div>
              )}
            </div>

            <div className="w-full border-t border-base-200 mt-2 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col p-3 bg-base-200/50 rounded-box">
                  <span className="text-xs uppercase tracking-wide opacity-50">
                    Status
                  </span>
                  <span className="font-semibold text-success">Active</span>
                </div>
                <div className="flex flex-col p-3 bg-base-200/50 rounded-box">
                  <span className="text-xs uppercase tracking-wide opacity-50">
                    Member Since
                  </span>
                  <span className="font-semibold">
                    {user?.metadata?.creationTime
                      ? dayjs(user.metadata.creationTime).format("DD MMMM YYYY")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MyProfile;