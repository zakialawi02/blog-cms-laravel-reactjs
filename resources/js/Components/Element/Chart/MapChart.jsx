import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";

// Initialize the map module
HighchartsMap(Highcharts);

const topology = await fetch(
    "https://code.highcharts.com/mapdata/custom/world.topo.json"
).then((response) => response.json());

const MapChart = ({ graphData }) => {
    const mapData = graphData.map((item) => ({
        "hc-key": item.code.toLowerCase(),
        value: item?.total_views || item?.views,
    }));

    const options = {
        chart: {
            map: topology,
        },

        title: {
            text: "Visitors by Country",
            align: "left",
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: "bottom",
            },
        },

        colorAxis: {
            min: 0,
            type: "linear",
        },

        tooltip: {
            valueDecimals: 0,
            valueSuffix: " visitors",
        },

        series: [
            {
                data: mapData,
                name: "Visitors",
                allowPointSelect: true,
                cursor: "pointer",
                states: {
                    select: {
                        color: "#a4edba",
                        borderColor: "gray",
                    },
                    hover: {
                        color: "#BADA55",
                        enabled: true,
                        borderColor: "gray",
                    },
                },
            },
        ],
    };

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"mapChart"}
                options={options}
            />
        </>
    );
};

export default MapChart;
