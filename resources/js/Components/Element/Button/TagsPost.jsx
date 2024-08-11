import Tag from "./Tag";

const TagsPost = ({ tags }) => {
    return (
        <>
            {/* tags  */}
            {tags.map((tag, index) => (
                <Tag key={index} tag={tag} />
            ))}
        </>
    );
};

export default TagsPost;
