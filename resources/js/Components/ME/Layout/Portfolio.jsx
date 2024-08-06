import CardImage from "../Element/Portfolio/CardImage";
import CardImageDesc from "../Element/Portfolio/CardImageDesc";
import NavButton from "../Element/Portfolio/NavButton";

const Portfolio = () => {
    return (
        <section
            id="portfolio"
            className="p-4 bg-Me-primary dark:bg-Me-dark-primary"
        >
            <div className="container min-h-[90vh] flex flex-col px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-28">
                <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-Me-light">
                    <h2>Portfolio</h2>
                </div>

                <div className="w-full p-2 px-4 mb-4">
                    <div
                        id="type-list"
                        className="flex flex-wrap gap-1 px-2 py-4 text-Me-accent dark:text-Me-dark-accent"
                    >
                        <NavButton active="true" type="all">
                            All
                        </NavButton>
                        <NavButton type="photo">Photo</NavButton>
                        <NavButton type="design">Design</NavButton>
                        <NavButton type="web">Web</NavButton>
                    </div>

                    <div className="flex flex-col flex-wrap gap-2 p-2 mt-4 md:flex-row">
                        <CardImageDesc
                            photo="/assets/img/Portfolio/Personal-Web.png"
                            type="web"
                            title="Personal Web"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maiores explicabo dolores nobis quidem facilis
                            quaerat suscipit?
                        </CardImageDesc>
                        <CardImageDesc
                            photo="/assets/img/Portfolio/zakiphoto.png"
                            type="web"
                            title="Personal Web Gallery"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quibusdam, officia aliquam velit ipsa
                            architecto sapiente eius facilis provident quos
                            soluta?
                        </CardImageDesc>

                        <CardImage
                            photo="/assets/img/Portfolio/IMG_8576-7.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/20190803_054047-scaled.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/P_20180410_150823_SRES.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/Copy-of-IMG_6743-2-scaled.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/IMG20190624073359-scaled.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/IMG_0087-1-rotated.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/IMG_7621-1-scaled.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/IMG_7643-scaled.jpg"
                            type="photo"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/01.-Cover.png"
                            type="design"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/01-cloud.jpg"
                            type="design"
                        />
                        <CardImage
                            photo="/assets/img/Portfolio/01-Hari-ulang-tahun-ITS-(10-Nov).png"
                            type="design"
                        />
                        <CardImageDesc
                            photo="/assets/img/Portfolio/himage.png"
                            type="web"
                            title="HIMAGE-ITS Website"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatum, dignissimos laborum.
                        </CardImageDesc>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
