import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonOneLine from "../Skeleton/SkeletonOneLine";

// Initialize the map module
HighchartsMap(Highcharts);

const MapChart = ({ graphData }) => {
    const [ready, setReady] = useState(false);
    const [topology, setTopology] = useState({});

    useEffect(() => {
        const geojson = async () => {
            const response = await axios.get(
                "https://code.highcharts.com/mapdata/custom/world.topo.json"
            );
            setTopology(response.data);
            setReady(true);
        };
        geojson();
    }, []);

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
            {!ready && <SkeletonOneLine height={64} />}

            {ready ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"mapChart"}
                    options={options}
                />
            ) : null}
        </>
    );
};

export default MapChart;
