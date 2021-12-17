import { Col, Form, Input, InputNumber, Row } from 'antd';
import { Radio } from 'antd';
import { Const } from '@/constants/Const';
import { useDispatch, useSelector } from 'react-redux';
import { settingPersistModule, SettingState } from '@/stores/modules/SettingPersistModule';
import { IState } from '@/stores';
import { Setting } from '@/models/Setting';
import React from 'react';

interface IProp {
  pageNum: number;
  setting: Setting;
  title: string;
}

const PDFController = (prop: IProp) => {
  const dispatch = useDispatch();
  const settingState: SettingState = useSelector((state: IState) => state.settingPersistModule);
  const [title, setTitle] = React.useState<string>(prop.title);
  const [setting, setSetting] = React.useState<Setting>(prop.setting);

  React.useEffect(() => {
    setTitle(prop.title);
  }, [prop.title]);

  React.useEffect(() => {
    console.log(prop.setting);
    setSetting(prop.setting);
  }, [prop.setting]);

  return (
    <div style={{ padding: '20px' }}>
      <Row>
        <Col span={6}>LayoutType：</Col>
        <Col>
          <Radio.Group
            onChange={(e) => {
              setSetting(new Setting(e.target.value, setting.paddingSize));
              dispatch(
                settingPersistModule.actions.setSettings(
                  settingState.settings.map((setting: Setting, i) =>
                    i + 1 === prop.pageNum ? new Setting(e.target.value, setting.paddingSize) : setting,
                  ),
                ),
              );
            }}
            value={setting.layoutType}
          >
            {[
              Const.LayoutType.One,
              Const.LayoutType.Two,
              Const.LayoutType.Three,
              Const.LayoutType.Four,
              Const.LayoutType.Five,
              Const.LayoutType.Six,
            ].map((layoutType) => (
              <Radio.Button value={layoutType} key={layoutType}>
                {layoutType}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Col>
      </Row>
      <Row style={{ paddingTop: '20px' }}>
        <Col span={6}>Title：</Col>
        <Col span={8}>
          <Input
            value={title}
            maxLength={20}
            placeholder="Page Title"
            onChange={(e) => {
              setTitle(e.target.value);
              dispatch(
                settingPersistModule.actions.setTitles(
                  settingState.titles.map((t: string, i) => (i + 1 === prop.pageNum ? e.target.value : t)),
                ),
              );
            }}
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: '20px' }}>
        <Col span={6}>Padding Size：</Col>
        <Col>
          <Radio.Group
            onChange={(e) => {
              setSetting(new Setting(setting.layoutType, e.target.value));
              dispatch(
                settingPersistModule.actions.setSettings(
                  settingState.settings.map((setting: Setting, i) =>
                    i + 1 === prop.pageNum ? new Setting(setting.layoutType, e.target.value) : setting,
                  ),
                ),
              );
            }}
            value={setting.paddingSize}
          >
            {[5, 10, 20].map((paddingSize) => (
              <Radio.Button value={paddingSize} key={paddingSize}>
                {paddingSize}mm
              </Radio.Button>
            ))}
          </Radio.Group>
        </Col>
      </Row>
    </div>
  );
};

export default PDFController;
