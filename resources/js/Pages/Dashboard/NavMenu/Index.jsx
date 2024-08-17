import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import SelectInput from "@/Components/Element/Input/SelectInput";
import TextInput from "@/Components/Element/Input/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, useForm } from "@inertiajs/react";

const Index = ({ auth, meta, menuLinks }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        url: "",
        class: "",
        order: "",
        parent_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.menus-item.store"), {
            onSuccess: () => {
                reset();
                router.reload();
            },
        });
    };

    const handleDelete = (data) => {
        router.delete(route("admin.menus-item.destroy", data.id), {
            onBefore: () => confirm("Are you sure?"),
            onSuccess: () => {
                router.reload();
            },
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Menu Setting"></Head>

            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="">
                        <Card>
                            <div className="mb-3 text-xl">
                                <h3>Add new menu item</h3>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Name"
                                        className=""
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        className="w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor="url"
                                        value="URL"
                                        className=""
                                    />
                                    <TextInput
                                        id="url"
                                        type="text"
                                        name="url"
                                        placeholder="Enter url (can use relative url/absolute url)"
                                        className="w-full"
                                        value={data.url}
                                        onChange={(e) =>
                                            setData("url", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.url}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor="class"
                                        value="Class"
                                        className=""
                                    />
                                    <SelectInput
                                        required
                                        id="class"
                                        name="class"
                                        value={data.class}
                                        defaultValue=""
                                        onChange={(e) =>
                                            setData("class", e.target.value)
                                        }
                                    >
                                        <option value="" selected="">
                                            --- select class ---
                                        </option>
                                        <option value="header">header</option>
                                        <option value="footer-a">
                                            footer-a
                                        </option>
                                        <option value="footer-b">
                                            footer-b
                                        </option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.class}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor="order"
                                        value="Order"
                                        className=""
                                    />
                                    <TextInput
                                        id="order"
                                        type="number"
                                        name="order"
                                        placeholder="0"
                                        className="w-full"
                                        value={data.order}
                                        onChange={(e) =>
                                            setData("order", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.order}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        htmlFor="class"
                                        value="Parent Menu Item (Header)"
                                        className=""
                                    />
                                    <SelectInput
                                        id="parent_id"
                                        name="parent_id"
                                        value={data.parent_id}
                                        onChange={(e) =>
                                            setData("parent_id", e.target.value)
                                        }
                                    >
                                        <option value="">None</option>
                                        {menuLinks?.header?.length != [] && (
                                            <>
                                                {menuLinks.header.map(
                                                    (item, index) => (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </SelectInput>
                                    <InputError
                                        message={errors.parent_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-3">
                                    <ButtonBE
                                        color={"bg-backend-primary"}
                                        className="px-2 py-1 text-white rounded hover:bg-backend-primary/75"
                                        disabled={processing}
                                    >
                                        Save
                                    </ButtonBE>
                                </div>
                            </form>
                        </Card>
                    </div>
                    <div className="">
                        <Card>
                            <div className="">
                                <div className="my-3 text-xl">
                                    <h3>Header Nav</h3>
                                </div>
                                {menuLinks?.header?.length != 0 ? (
                                    <>
                                        {menuLinks.header.map((item, index) => (
                                            <>
                                                <Card
                                                    key={index}
                                                    className="flex justify-between mb-2 border-2 shadow-none border-backend-dark"
                                                >
                                                    <div className="">
                                                        <h4>
                                                            <b>{item.name}</b>
                                                        </h4>
                                                        <a
                                                            href={item.url}
                                                            className="text-backend-secondary hover:text-backend-primary"
                                                        >
                                                            {item.url}
                                                        </a>
                                                    </div>

                                                    <div className="">
                                                        <ButtonBE
                                                            color={
                                                                "bg-backend-error"
                                                            }
                                                            className="px-2 py-1 text-white rounded hover:bg-backend-error/75"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </ButtonBE>
                                                    </div>
                                                </Card>
                                                {item.children.length > 0 && (
                                                    <>
                                                        {item.children.map(
                                                            (item, index) => (
                                                                <Card
                                                                    key={index}
                                                                    className="flex justify-between mb-2 ml-3 border-2 shadow-none border-backend-dark"
                                                                >
                                                                    <div className="">
                                                                        <h4>
                                                                            <b>
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </b>
                                                                        </h4>
                                                                        <a
                                                                            href={
                                                                                item.url
                                                                            }
                                                                            className="text-backend-secondary hover:text-backend-primary"
                                                                        >
                                                                            {
                                                                                item.url
                                                                            }
                                                                        </a>
                                                                    </div>

                                                                    <div className="">
                                                                        <ButtonBE
                                                                            color={
                                                                                "bg-backend-error"
                                                                            }
                                                                            className="px-2 py-1 text-white rounded hover:bg-backend-error/75"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </ButtonBE>
                                                                    </div>
                                                                </Card>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ))}
                                    </>
                                ) : (
                                    <span>No menu items</span>
                                )}
                            </div>

                            <div className="">
                                <div className="my-3 text-xl">
                                    <h3>Footer A</h3>
                                </div>
                                {menuLinks?.footer_a?.length != 0 ? (
                                    <>
                                        {menuLinks.footer_a.map(
                                            (item, index) => (
                                                <Card
                                                    key={index}
                                                    className="flex justify-between mb-2 border-2 shadow-none border-backend-dark"
                                                >
                                                    <div className="">
                                                        <h4>
                                                            <b>{item.name}</b>
                                                        </h4>
                                                        <a
                                                            href={item.url}
                                                            className="text-backend-secondary hover:text-backend-primary"
                                                        >
                                                            {item.url}
                                                        </a>
                                                    </div>

                                                    <div className="">
                                                        <ButtonBE
                                                            color={
                                                                "bg-backend-error"
                                                            }
                                                            className="px-2 py-1 text-white rounded hover:bg-backend-error/75"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </ButtonBE>
                                                    </div>
                                                </Card>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <span>No menu items</span>
                                )}
                            </div>

                            <div className="">
                                <div className="my-3 text-xl">
                                    <h3>Footer b</h3>
                                </div>
                                {menuLinks?.footer_b?.length != 0 ? (
                                    <>
                                        {menuLinks.footer_b.map(
                                            (item, index) => (
                                                <Card
                                                    key={index}
                                                    className="flex justify-between mb-2 border-2 shadow-none border-backend-dark"
                                                >
                                                    <div className="w-3/4">
                                                        <h4>
                                                            <b>{item.name}</b>
                                                        </h4>
                                                        <a
                                                            href={item.url}
                                                            className="text-backend-secondary hover:text-backend-primary"
                                                        >
                                                            {item.url}
                                                        </a>
                                                    </div>

                                                    <div className="">
                                                        <ButtonBE
                                                            color={
                                                                "bg-backend-error"
                                                            }
                                                            className="px-2 py-1 text-white rounded hover:bg-backend-error/75"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </ButtonBE>
                                                    </div>
                                                </Card>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <span>No menu items</span>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Index;
