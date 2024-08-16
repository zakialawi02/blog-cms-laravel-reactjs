const getCommentsPost = async (slug, loading, callback) => {
    try {
        const res = await axios.post(route("getComment", slug));
        const data = res.data;
        loading(false);
        callback(data);
    } catch (err) {
        console.error(err);
        loading(false);
    }
};
export default getCommentsPost;
