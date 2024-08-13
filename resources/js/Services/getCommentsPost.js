const getCommentsPost = async (slug, loading, callback) => {
    try {
        const res = await axios.post(route("getComment", slug));
        const data = res.data;
        loading(false);
        callback(data);
    } catch (err) {
        console.log(err);
        loading(false);
    }
};
export default getCommentsPost;
