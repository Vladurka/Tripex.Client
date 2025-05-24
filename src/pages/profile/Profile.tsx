import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePostStore } from "@/stores/usePostStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { id } = useParams();

  const { profile, getProfile, updateProfile } = useProfileStore();
  const { userId } = useAuthStore();
  const { posts, getPostsByProfile } = usePostStore();

  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedFirstName, setEditedFirstName] = useState<string | null>(null);
  const [editedLastName, setEditedLastName] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string | null>(
    null
  );

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProfile(id);
    getPostsByProfile(id);
  }, [getProfile, getPostsByProfile, id]);

  useEffect(() => {
    if (profile && userId) {
      setIsMyProfile(userId === profile.id);
      setEditedName(profile.profileName ?? "");
      setEditedFirstName(profile.firstName ?? null);
      setEditedLastName(profile.lastName ?? null);
      setEditedDescription(profile.description ?? null);
    }
  }, [profile, userId]);

  if (!userId || !profile) return;

  const handleSave = async () => {
    const trimmedName = editedName.trim();
    if (!trimmedName) {
      return;
    }

    await updateProfile({
      profileName: trimmedName,
      firstName: editedFirstName?.trim() || null,
      lastName: editedLastName?.trim() || null,
      description: editedDescription?.trim() || null,
    });

    await getProfile(userId);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(profile.profileName ?? "");
    setEditedFirstName(profile.firstName ?? null);
    setEditedLastName(profile.lastName ?? null);
    setEditedDescription(profile.description ?? null);
    setIsEditing(false);
  };

  const trimmedName = editedName.trim();
  const canSave =
    trimmedName !== "" &&
    (trimmedName !== (profile.profileName ?? "").trim() ||
      editedFirstName !== profile.firstName ||
      editedLastName !== profile.lastName ||
      editedDescription !== profile.description);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <div className="flex items-center gap-8 w-full max-w-4xl ml-[30%]">
        <Avatar className="w-45 h-45">
          <AvatarImage src={profile.avatarUrl ?? "/avatar.png"} alt="Avatar" />
          <AvatarFallback>
            {profile.profileName?.[0]?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="inline-flex items-start space-x-3">
            {isEditing ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  className="input input-bordered text-2xl font-bold text-primary-content"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
            ) : (
              <h1 className="text-2xl font-bold text-primary-content">
                {editedName}
              </h1>
            )}

            {isMyProfile ? (
              isEditing ? (
                <>
                  <button
                    className="btn btn-success btn-sm mt-1"
                    onClick={handleSave}
                    disabled={!canSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-error btn-sm mt-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit profile
                </button>
              )
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          <div className="flex gap-6 text-sm mt-2 text-primary-content">
            <span>
              <strong>{posts.length}</strong> posts
            </span>
            <span>
              <strong>{profile.followersCount}</strong> followers
            </span>
            <span>
              <strong>{profile.followingCount}</strong> following
            </span>
          </div>

          <div className="mt-2 text-sm text-primary-content font-semibold">
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="input input-bordered mr-2 text-primary-content"
                  value={editedFirstName ?? ""}
                  onChange={(e) =>
                    setEditedFirstName(
                      e.target.value.trim() === "" ? null : e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  className="input input-bordered text-primary-content"
                  value={editedLastName ?? ""}
                  onChange={(e) =>
                    setEditedLastName(
                      e.target.value.trim() === "" ? null : e.target.value
                    )
                  }
                />
              </>
            ) : (
              <p>
                {editedFirstName} {editedLastName}
              </p>
            )}
          </div>

          {isEditing ? (
            <textarea
              className="textarea textarea-bordered text-primary-content w-full mt-2"
              value={editedDescription ?? ""}
              onChange={(e) =>
                setEditedDescription(
                  e.target.value.trim() === "" ? null : e.target.value
                )
              }
              rows={3}
              placeholder="Your bio or description"
            />
          ) : (
            <p className="mt-2 text-sm text-primary-content font-semibold">
              {!editedDescription?.trim()
                ? "No description"
                : editedDescription}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-8 max-w-4xl w-full ml-[10%] border-t-2 pt-10">
        {posts.map((post, index) => (
          <img
            key={index}
            src={post.contentUrl}
            alt={`Post ${index + 1}`}
            className="h-full aspect-square object-cover"
          />
        ))}
      </div>
    </div>
  );
};
