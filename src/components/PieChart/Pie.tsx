import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { getCoinColors } from "../../helper/HelperFunctions";
import { useAppSelector } from "../../store/hooks";

const PieChart = (data: any) => {
  //  let coinPrices = useAppSelector((state) => state.wallet.prices);
  let coinHistory = useAppSelector((state) => state.coin.coinHistory);
  let colors = getCoinColors(data.data, coinHistory);
  return (
    <ResponsivePie
      data={data.data}
      innerRadius={0.5}
      margin={{ top: 25, right: 0, bottom: 25, left: 0 }}
      padAngle={0.9}
      cornerRadius={5}
      colors={colors}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="white"
      arcLinkLabelsThickness={1}
      arcLinkLabelsColor="white"
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="white"
    />
  );
};

export default PieChart;
