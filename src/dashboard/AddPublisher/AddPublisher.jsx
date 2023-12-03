import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxios";

const AddPublisher = () => {

    const axiosPublic = useAxiosPublic();

    const handleAddPublisher = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const document = {
            name,
            image
        }
        axiosPublic.post('/add-publisher', document).then(res => {
            if (res?.status === 200) {
                Swal.fire("Great", "You have add a publisher successfully.", "success");
                form.reset('');
            }
        })

        console.log(document)
    }

    return (
        <div>
            <h3>Add Publisher</h3>

            <div>
                <form onSubmit={handleAddPublisher} className="flex flex-col gap-3">
                    <input type="text" placeholder="Publisher name" name="name" className="py-2 px-4 border border-slate-400" />
                    <input type="text" placeholder="Publisher image" name="image" className="py-2 px-4 border border-slate-400" />
                    <button className="py-2 px-5 bg-slate-300 w-fit hover:bg-slate-400" type="submit">Add Publisher</button>
                </form>
            </div>
        </div>
    );
};

export default AddPublisher;