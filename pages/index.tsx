import type { NextPage } from 'next';
import PDFController from '../components/PDFController';
import React from 'react';
import PDFPreview from '@/components/PDFPreview';
import { Setting } from '@/models/Setting';
import { Const } from '@/constants/Const';
import { useDispatch, useSelector } from 'react-redux';
import { settingPersistModule, SettingState } from '@/stores/modules/SettingPersistModule';
import { IState } from '@/stores';
import { Button } from 'antd';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const settingState: SettingState = useSelector((state: IState) => state.settingPersistModule);

  React.useEffect(() => {
    if (settingState.settings.length === 0) {
      dispatch(
        settingPersistModule.actions.setSettings([
          new Setting(Const.LayoutType.One, 5),
          new Setting(Const.LayoutType.Two, 5),
          new Setting(Const.LayoutType.Three, 5),
        ]),
      );
    }
    if (settingState.settings.length === 0) {
      dispatch(settingPersistModule.actions.setTitles(['Page One', 'Page Two', 'Page Three']));
    }
  }, []);

  const resetSetting = () => {
    dispatch(
      settingPersistModule.actions.setSettings([
        new Setting(Const.LayoutType.One, 5),
        new Setting(Const.LayoutType.Two, 5),
        new Setting(Const.LayoutType.Three, 5),
      ]),
    );
    dispatch(settingPersistModule.actions.setTitles(['Page One', 'Page Two', 'Page Three']));
  };

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white' }}>
        <Button size={'large'} type="primary">
          PDF Generate
        </Button>
        <Button size={'large'} onClick={resetSetting}>
          Reset Setting
        </Button>
      </div>
      {settingState.settings.map((setting, i) => (
        <section key={i}>
          <div className="grid grid-cols-2 ">
            <div className="border-r-4 border-white">
              <div className="sheet">
                <div style={{ display: 'table', height: '100%', width: '100%' }}>
                  <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <PDFController pageNum={i + 1} setting={setting} title={settingState.titles[i]} />
                  </div>
                </div>
              </div>
            </div>
            <div className="sheet">
              <PDFPreview pageNum={i + 1} setting={setting} title={settingState.titles[i]} isCompact={true} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
