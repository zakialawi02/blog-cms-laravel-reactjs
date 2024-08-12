import Tag from "./Tag";

const TagsPost = ({ tags }) => {
    return (
        <>
            {tags.map((tag, index) => (
                <Tag key={index} label={tag} />
            ))}
        </>
    );
};

export default TagsPost;
