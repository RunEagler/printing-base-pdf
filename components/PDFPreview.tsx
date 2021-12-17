import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import React, { useCallback } from 'react';
import { Const } from '@/constants/Const';
import { Setting } from '@/models/Setting';

interface IProp {
  setting: Setting;
  title: string;
  pageNum: number;
  isCompact: boolean;
}

const PDFPreview = (prop: IProp) => {
  const [layoutOrder, setLayoutOrder] = React.useState<number[]>([]);

  const ImageSection = () => (
    <div style={{ padding: '0 20px 0 20px', display: 'flex' }}>
      <div style={{ flex: 2, paddingRight: '20px' }}>
        {[...Array(8).keys()].map((i) => (
          <div key={`${prop.pageNum}-${i}`} className={prop.isCompact ? 'preview-skeleton-bar' : 'skeleton-bar'} />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <img src={'no-image.png'} style={{ width: '100%', height: '94%' }} />
      </div>
    </div>
  );

  const ChartSection = useCallback(
    () => (
      <div style={{ padding: '0 20px 0 20px', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <BarChart />
        </div>
        <div style={{ flex: 1 }}>
          <PieChart />
        </div>
      </div>
    ),
    [prop.setting.layoutType],
  );

  const SentenceSection = () => (
    <div>
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {[...Array(7).keys()].map((i) => (
          <div key={`${prop.pageNum}-${i}`} className={prop.isCompact ? 'preview-skeleton-bar' : 'skeleton-bar'} />
        ))}
      </div>
    </div>
  );

  React.useEffect(() => {
    let order: number[];
    switch (prop.setting.layoutType) {
      case Const.LayoutType.One:
        order = [1, 2, 3];
        break;
      case Const.LayoutType.Two:
        order = [1, 3, 2];
        break;
      case Const.LayoutType.Three:
        order = [2, 1, 3];
        break;
      case Const.LayoutType.Four:
        order = [2, 3, 1];
        break;
      case Const.LayoutType.Five:
        order = [3, 1, 2];
        break;
      case Const.LayoutType.Six:
        order = [3, 2, 1];
        break;
    }
    setLayoutOrder(order);
  }, [prop.setting]);

  return (
    <div style={{ padding: `0 ${prop.setting.paddingSize}mm` }}>
      <h1 style={{ textAlign: 'center', padding: '10px', fontSize: '20px' }}>
        {prop.title === '' ? 'Page Title' : prop.title}
      </h1>
      {layoutOrder.map((order) => {
        switch (order) {
          case 1:
            return <ImageSection key={`${prop.pageNum}-${order}`} />;
          case 2:
            return <ChartSection key={`${prop.pageNum}-${order}`} />;
          case 3:
            return <SentenceSection key={`${prop.pageNum}-${order}`} />;
        }
      })}
    </div>
  );
};

export default PDFPreview;
