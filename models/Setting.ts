import { Const } from '@/constants/Const';

export class Setting {
  public layoutType: Const.LayoutType = Const.LayoutType.One;
  public paddingSize: number = 5;

  constructor(layoutType: Const.LayoutType, paddingSize: number) {
    this.layoutType = layoutType;
    this.paddingSize = paddingSize;
  }
}
