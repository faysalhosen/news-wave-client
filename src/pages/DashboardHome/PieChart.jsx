import Chart from "react-google-charts";

const PieChart = () => {
    const data = [
        ["Publications", "Percentage"],
        ["Politics", 11],
        ["Technology", 20],
        ["Sports", 10],
        ["Health", 5],
        ["Business", 15],
        ["Entertainment", 25],
        ["Science", 7],
        ["Travel", 10],
    ];
   
    const options = {
        title: "Percentage of publications articles",
        is3D: false,
    };


    return (
        <div>
            <Chart
                className='bg-[#050000]'
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />

        </div>
    );
};

export default PieChart;