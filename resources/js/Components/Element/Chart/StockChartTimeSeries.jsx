import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const StockChartTimeSeries = ({ graphData }) => {
    const mapData = graphData.map((item) => [
        item.timestamp * 1000,
        item.view_count,
    ]);

    // create the chart
    const options = {
        chart: {
            alignTicks: false,
        },

        rangeSelector: {
            selected: 0,
        },

        title: {
            text: "Visitor Statistics",
        },

        series: [
            {
                type: "column",
                name: "Visitor Statistics",
                data: mapData,
                dataGrouping: {
                    units: [
                        ["day", [1]],
                        ["month", [1, 2, 3]],
                    ],
                },
            },
        ],
    };

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
            />
        </>
    );
};

export default StockChartTimeSeries;
