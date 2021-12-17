import PDFPreview from '@/components/PDFPreview';
import React from 'react';
import { SettingState } from '@/stores/modules/SettingPersistModule';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@/stores';
import { NextPage } from 'next';

const PreviewPage: NextPage = () => {
  const settingState: SettingState = useSelector((state: IState) => state.settingPersistModule);
  return (
    <>
      {settingState.settings.map((setting, i) => (
        <div className="sheet" key={i}>
          <PDFPreview pageNum={i + 1} setting={setting} title={settingState.titles[i]} />
        </div>
      ))}
    </>
  );
};

export default PreviewPage;
