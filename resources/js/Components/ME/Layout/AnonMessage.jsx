import MessageBox from "../Element/AnonMessage/MessageBox";

const AnonMessage = ({ data }) => {
    console.log(data);

    return (
        <section
            id="message"
            className="p-4 bg-Me-primary dark:bg-Me-dark-primary"
        >
            <div className="container min-h-[80vh] flex flex-col items-center justify-center px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-32">
                <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-Me-light">
                    <h2>Anonymous Message</h2>
                </div>

                <div className="w-[95%] md:w-[80%] lg:w-[65%]">
                    <div className="bg-white rounded-xl dark: dark:bg-gray-200">
                        <div className="p-4 m-1">
                            <div
                                id="chatBox"
                                className="w-full p-1 md:p-4 flex flex-col-reverse h-[60vh] overflow-y-scroll"
                            >
                                {data.map((data, index) => (
                                    <MessageBox
                                        key={index}
                                        sender={data?.sender}
                                        body={data?.body}
                                        time={data?.time}
                                    />
                                ))}
                            </div>

                            <div className="p-4">
                                <hr className="mb-2 border border-gray-300" />
                                <form
                                    method="POST"
                                    className="form"
                                    id="pesan"
                                    name="pesan"
                                    htmlFor="pesan"
                                >
                                    <textarea
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        cols="5"
                                        rows="2"
                                        placeholder="Your Message"
                                        name="pesan"
                                        id="pesan"
                                        required
                                    />
                                    <input
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        type="text"
                                        placeholder="Your Name / Anonymous"
                                        name="sender"
                                        id="sender"
                                    />

                                    <button
                                        id="sendMessage"
                                        type="submit"
                                        className="p-2 mt-2 rounded-xl bg-Me-primary text-Me-light hover:bg-Me-light hover:text-Me-primary dark:bg-Me-dark-primary dark:hover:bg-Me-dark-accent dark:hover:text-Me-dark-primary"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnonMessage;
