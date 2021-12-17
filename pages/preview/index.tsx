import PDFPreview from '@/components/PDFPreview';
import React from 'react';
import { settingPersistModule, SettingState } from '@/stores/modules/SettingPersistModule';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/stores';
import { NextPage } from 'next';
import { Setting } from '@/models/Setting';
import { Const } from '@/constants/Const';

const Index: NextPage = () => {
  const settingState: SettingState = useSelector((state: IState) => state.settingPersistModule);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (settingState.settings.length === 0) {
      dispatch(
        settingPersistModule.actions.setSettings([
          new Setting(Const.LayoutType.One,5),
          new Setting(Const.LayoutType.Two,5),
          new Setting(Const.LayoutType.Three,5),
        ]),
      );
    }
    if (settingState.settings.length === 0) {
      dispatch(settingPersistModule.actions.setTitles(['Page One', 'Page Two', 'Page Three']));
    }
  }, []);
  return (
    <>
      {settingState.settings.map((setting, i) => (
        <div className="print-sheet" key={i}>
          <PDFPreview pageNum={i + 1} setting={setting} title={settingState.titles[i]} isCompact={false} />
        </div>
      ))}
    </>
  );
};

export default Index;
