// assets/index.js

/**
 * 集中管理所有图片资源
 * 使用时：import { Images } from '../assets';
 * 路径是相对于 assets/index.js
 */
export const Images = {
  // HomeScreen 中要用到的图标
  mapPin:   require('./HomeScreen/map-pin.png'),
  bell:     require('./HomeScreen/bell.png'),
  myHomeBg:     require('./HomeScreen/my-home-bg.png'),
  communitybg:     require('./HomeScreen/community-bg.png'),
  lightning: require('./HomeScreen/lightning.png'),
  star:      require('./HomeScreen/star.png'),
  //goButton: require('./HomeScreen/go-button.png'),
  // 后续有更多图标，就按下面格式添加：
  // someIcon: require('./SomeFolder/some-icon.png'),
};