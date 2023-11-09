import { baseApi } from "./baseApi";
import providesList from "../../helpers/providesList";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: (identifier) => ({
                url: `/users/${identifier}`,
            }),
            providesTags: (result, err, arg) =>
                result
                    ? [
                          {
                              type: "User",
                              id: result._id,
                          },
                      ]
                    : ["User"],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                {
                    type: "User",
                    id: arg.id,
                },
            ],
        }),

        getUserFollowers: builder.query({
            query: ({ username, page, limit }) => ({
                url: `/users/${username}/followers?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result) => providesList(result?.data, "User", "FOLLOWERS"),
        }),
        getUserFollowing: builder.query({
            query: ({ username, page, limit }) => ({
                url: `/users/${username}/following?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result) => providesList(result?.data, "User", "FOLLOWING"),
        }),

        getUserTweets: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/timeline?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "TIMELINE"),
        }),
        getUserReplies: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/replies?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "REPLIES"),
        }),
        getUserLikes: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/likes?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "LIKES"),
        }),
        getUserMedia: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/media?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "MEDIA"),
        }),

        followUser: builder.mutation({
            query: ({ id, targetUserId }) => ({
                url: `/users/${id}/following`,
                method: "PUT",
                body: {
                    targetUserId,
                },
            }),
            invalidatesTags: (result, error, { id, targetUserId }) => [
                { type: "User", id },
                { type: "User", id: targetUserId },
            ],
        }),
        unfollowUser: builder.mutation({
            query: ({ id, targetUserId }) => ({
                url: `/users/${id}/following`,
                method: "DELETE",
                body: {
                    targetUserId,
                },
            }),
            invalidatesTags: (result, error, { id, targetUserId }) => [
                { type: "User", id },
                { type: "User", id: targetUserId },
            ],
        }),

        createRepost: builder.mutation({
            query: ({ tweetId }) => ({
                url: `/tweets/${tweetId}/repost`,
                method: "POST",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
        deleteRepost: builder.mutation({
            query: ({ tweetId }) => ({
                url: `/tweets/${tweetId}/repost`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),

        likeTweet: builder.mutation({
            query: ({ id }) => ({
                url: `/tweets/${id}/like`,
                method: "POST",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
        unlikeTweet: builder.mutation({
            query: ({ id }) => ({
                url: `/tweets/${id}/like`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
    }),
});

export const {
    useGetUserInfoQuery,
    useGetUserTweetsQuery,
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
    useUpdateUserMutation,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useLikeTweetMutation,
    useUnlikeTweetMutation,
    useGetUserLikesQuery,
    useGetUserRepliesQuery,
    useGetUserMediaQuery,
    useCreateRepostMutation,
    useDeleteRepostMutation,
} = userApi;
