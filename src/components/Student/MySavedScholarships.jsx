import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { PiEye, PiTrash, PiNoteThin } from "react-icons/pi";
import dayjs from "dayjs";
import Loader from "../common/Loader/Loader";

const MySavedScholarships = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Saved Scholarships
  const {
    data: bookmarks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-saved-scholarships", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookmarks/${user.email}`);
      return res.data;
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove from saved?",
      text: "You can always bookmark it again later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/bookmarks/${id}`, { data: { email: user.email } })
          .then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Removed!",
              "Scholarship has been removed from your saved list.",
              "success"
            );
            refetch();
          }
          });
      }
    });
  };

  const formatFees = (fee) => {
    if (fee === undefined || fee === null) return "N/A";
    return fee === 0 ? "Free" : `$${fee.toLocaleString()}`;
  };

  if (isLoading)
    return <Loader/>

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">
          My Saved Scholarships ({bookmarks.length})
        </h2>
        {bookmarks.length === 0 ? (
          <div className="text-center p-10">
            <p className="text-lg mb-4 text-base-content/60">
              You haven't saved any scholarships yet.
            </p>
            <Link to="/all-scholarships" className="btn btn-primary">
              Browse Scholarships
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>University & Scholarship</th>
                  <th>Category</th>
                  <th>Application Fee</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookmarks.map((bookmark) => (
                  <tr key={bookmark._id}>
                    <td>
                      <div className="font-bold">
                        {bookmark.universityName}
                      </div>
                      <div className="text-sm opacity-70">
                        {bookmark.scholarshipName}
                      </div>
                      <div className="text-xs opacity-50">
                        {bookmark.universityCountry}
                      </div>
                    </td>
                    <td>
                      <div>{bookmark.scholarshipCategory}</div>
                      {bookmark.subjectCategory && (
                        <div className="text-xs opacity-70">
                          {bookmark.subjectCategory}
                        </div>
                      )}
                    </td>
                    <td>{formatFees(bookmark.applicationFees)}</td>
                    <td>
                      <span className="badge badge-outline">
                        {dayjs(bookmark.applicationDeadline).format(
                          "DD MMM YYYY"
                        )}
                      </span>
                    </td>
                    <td className="flex gap-2 flex-wrap">
                      <Link
                        to={`/scholarship-details/${bookmark.scholarshipId}`}
                        className="btn btn-ghost btn-xs tooltip"
                        data-tip="View Details"
                      >
                        <PiEye className="text-lg text-info" />
                      </Link>

                      <button
                        onClick={() => handleRemove(bookmark._id)}
                        className="btn btn-ghost btn-xs tooltip"
                        data-tip="Remove Bookmark"
                      >
                        <PiTrash className="text-lg text-error" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySavedScholarships;
