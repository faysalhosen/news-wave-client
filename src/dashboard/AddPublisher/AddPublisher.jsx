
const AddPublisher = () => {
    return (
        <div>
            <h3>Add Publisher</h3>

            <div>
                <form  className="flex flex-col gap-3">
                    <input type="text" placeholder="Publisher name" className="py-2 px-4 border border-slate-400" />
                    <input type="file" placeholder="Publisher image" />
                    <button className="py-2 px-5 bg-slate-300" type="submit">Add Publisher</button>
                </form>
            </div>
        </div>
    );
};

export default AddPublisher;