export default function CustomUploadAdapterPlugin(editor) {
    class MyUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            const formData = new FormData();
            return this.loader.file.then(
                (file) =>
                    new Promise((resolve, reject) => {
                        formData.append("upload", file, file.name);

                        return fetch("/dashboard/posts/upload-image", {
                            method: "POST",
                            headers: {
                                "X-CSRF-TOKEN": document
                                    .querySelector('meta[name="csrf-token"]')
                                    .getAttribute("content"),
                            },
                            body: formData,
                        })
                            .then((res) => res.json())
                            .then((d) => {
                                if (d.error) {
                                    reject(d.error?.upload);
                                }
                                if (d.url) {
                                    this.loader.uploaded = true;
                                    resolve({
                                        default: d.url,
                                    });
                                } else {
                                    reject(
                                        `Couldn't upload file: ${file.name}.`
                                    );
                                }
                            })
                            .catch((err) => {
                                reject("Upload failed");
                            });
                    })
            );
        }
    }

    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}
