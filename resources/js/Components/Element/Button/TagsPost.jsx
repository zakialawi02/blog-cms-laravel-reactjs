import Tag from "./Tag";

const TagsPost = ({ tags }) => {
    return (
        <>
            <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                    <Tag key={index} label={tag} />
                ))}
            </div>
        </>
    );
};

export default TagsPost;
