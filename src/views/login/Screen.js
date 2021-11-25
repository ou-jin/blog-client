import {
  PerspectiveCamera,
  Scene,
  FogExp2,
  WebGLRenderer,
  Geometry,
  TextureLoader,
  Vector3,
  VertexColors,
  Points,
  Color,
  PointsMaterial,
  Group,
} from "three";
import { useEffect } from "react";
import { rangeRandom, debounce } from "../../config/common/fcn";
import TWEEN from "@tweenjs/tween.js";
import dotImg from "../../assets/img/gradient.png";
import JSONLoader from "../../config/common/JSONLoader";

export default (props) => {
  let camera, scene, renderer, particles, group, geometry;
  let glist = [];
  let currentModel = 0;
  let position = [0, 0];
  const init = () => {
    initVariable();
    initMainParticles();
    initAroundParticles();
    initModel();
    animate();
    firstAnimation().then(() => {
      props.showLoginBox();
    });

    // const worker = new Worker("../views/login/workerRender.js");
    // worker.postMessage({
    //   question:
    //     "The Answer to the Ultimate Question of Life, The Universe, and Everything.",
    // });
    // worker.onmessage = ({ data: { answer } }) => {
    //   console.log(answer);
    // };
  };
  // 初始化变量
  const initVariable = () => {
    let container = document.getElementById("screen");
    // 初始化相机
    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      10,
      10000
    );
    camera.position.z = 750;
    // 初始化场景
    scene = new Scene();
    // 雾化
    scene.fog = new FogExp2(0x05050c, 0.0005);

    group = new Group();

    scene.add(group);

    // 初始化renderer
    renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x05050c);
    container.appendChild(renderer.domElement);
  };
  // 初始化变换粒子
  const initMainParticles = () => {
    console.time("initMainParticles");
    // 初始化geometry
    geometry = new Geometry();

    // 初始化贴图
    const textureLoader = new TextureLoader();
    //解决跨域问题
    textureLoader.crossOrigin = "";
    // 圆点
    const mapDot = textureLoader.load(dotImg);

    const POINT_LENGTH = 7524,
      POINT_SIZE = 4;
    for (let i = 0; i < POINT_LENGTH; i++) {
      const vertex = new Vector3();
      vertex.x = rangeRandom(window.innerWidth, -window.innerWidth);
      vertex.y = rangeRandom(window.innerHeight, -window.innerHeight);
      vertex.z = rangeRandom(window.innerWidth, -window.innerWidth);
      geometry.vertices.push(vertex);
      geometry.colors.push(new Color(255, 255, 255));
    }
    const material = new PointsMaterial({
      size: POINT_SIZE,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      map: mapDot,
    });

    material.vertexColors = VertexColors;
    particles = new Points(geometry, material);

    group.add(particles);
    // scene.add(particles);
    console.timeEnd("initMainParticles");
  };

  // 初始化环境粒子
  const initAroundParticles = () => {
    console.time("initAroundParticles");
    const around = new Geometry();

    // 初始化贴图
    const textureLoader = new TextureLoader();
    // 解决跨域问题
    textureLoader.crossOrigin = "";
    // 圆点
    const mapDot = textureLoader.load(dotImg);

    const minZVal = window.innerWidth * 0.7;
    const minYVal = window.innerHeight * 0.8;
    const color = new Color(255, 255, 255);
    // 初始化漫游粒子
    for (let i = 0; i < 100; i++) {
      const vertex = new Vector3();
      vertex.x = rangeRandom(minZVal, -minZVal); // 水平方向
      vertex.y = rangeRandom(minYVal, -minYVal); // 垂直方向
      vertex.z = rangeRandom(minZVal, -minZVal);
      around.vertices.push(vertex);
      around.colors.push(color);
    }
    const aroundMaterial = new PointsMaterial({
      size: 10,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      map: mapDot,
    });

    aroundMaterial.vertexColors = VertexColors;
    const aroundPoints = new Points(around, aroundMaterial);
    group.add(aroundPoints);
    // scene.add(aroundPoints);

    new TWEEN.Tween(aroundPoints.rotation)
      .to(
        {
          y: Math.PI * 2,
        },
        200000
      )
      .repeat(Infinity)
      .start();
      console.timeEnd("initAroundParticles");
  };

  // 初始化模型
  const initModel = () => {
    console.time("initModel");
    const loader = new JSONLoader();

    loader.load("../../assets/json/1game.json", function (geo, materials) {
      geo.center();
      geo.normalize();

      geo.scale(500, 500, 500);
      geo.rotateX(Math.PI / 3); // 上下
      geo.rotateY(-Math.PI / 8); // 左右
      geo.rotateZ(-Math.PI / 6);
      geo.translate(-300, 100, 0);

      glist[0] = geo;
    });
    loader.load("../../assets/json/2ac.json", function (geo, materials) {
      geo.center();
      geo.normalize();

      geo.scale(500, 500, 500);
      geo.rotateY(Math.PI / 5); // 左右
      geo.translate(-200, 0, 0);

      glist[1] = geo;
    });

    loader.load("../../assets/json/3book.json", function (geo, materials) {
      geo.center();
      geo.normalize();

      geo.scale(600, 500, 600);

      geo.rotateY(-Math.PI / 10); // 左右
      geo.translate(-300, 100, 0);

      glist[2] = geo;
    });

    loader.load("../../assets/json/4movice.json", function (geo, materials) {
      geo.center();
      geo.normalize();

      geo.scale(600, 600, 600);
      geo.rotateX(Math.PI / 2);
      geo.rotateY(0.98 * Math.PI); // 左右
      geo.translate(-200, 0, 0);
      glist[3] = geo;
    });

    loader.load("../../assets/json/5kv.json", function (geo, materials) {
      geo.center();
      geo.normalize();
      geo.scale(800, 800, 800);
      geo.translate(0, -400, 0);
      glist[4] = geo;
    });

    loader.load("../../assets/json/qr.json", function (geo, materials) {
      geo.center();
      geo.normalize();
      geo.scale(400, 400, 400);
      glist[5] = geo;
    });
    console.timeEnd('initModel')
  };

  const onDocumentMouseMove = (event) => {
    const rotateY = (event.pageX / (window.innerWidth * 30)) * 2 * Math.PI;
    const rotateX = (event.pageY / (window.innerHeight * 200)) * 2 * Math.PI;

    new TWEEN.Tween(group.rotation)
      .to(
        {
          x: rotateX,
          y: rotateY,
        },
        3000
      )
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
    event.preventDefault();
  };
  //
  const mouseMoveChangeModel = debounce((event) => {
    let randomNum = Math.ceil(Math.random() * (5 - 0)) + 0;
    while (currentModel == randomNum) {
      randomNum = Math.ceil(Math.random() * (5 - 0)) + 0;
    }
    currentModel = randomNum;
    console.log(
      Math.abs(event.pageX - position[0]),
      Math.abs(event.pageY - position[1])
    );
    if (
      (position[0] && Math.abs(event.pageX - position[0]) > 600) ||
      (position[1] && Math.abs(event.pageY - position[1]) > 400)
    ) {
      changeModel(currentModel);
    }
    position = [event.pageX, event.pageY];
  }, 500);
  // 首次动画
  const firstAnimation = () => {
    console.time('firstAnimation')
    const baseVal = -Math.PI * 0.6;
    return new Promise((resolve) => {
      group.rotation.y = baseVal;
      const twInstance = new TWEEN.Tween(group.rotation);
      twInstance
        .to(
          {
            y: 0,
          },
          5000
        )
        .delay(200)
        .onComplete(() => {
          // 绑定鼠标动画
          document.addEventListener("mousemove", onDocumentMouseMove, false);
          document.addEventListener("mousemove", mouseMoveChangeModel);

          // 自动切换到第一个模型
          // changeModel(0);
          resolve(true);
        })
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();
    });
    console.timeEnd('firstAnimation')
  };
  //
  const changeModel = (index) => {
    // 模型动画
    geometry.vertices.forEach(function (vtx, i) {
      let twInstance = vtx.tweenvtx;
      if (!twInstance) {
        twInstance = new TWEEN.Tween(vtx);
      }
      const length = glist[index].vertices.length;
      const o = glist[index].vertices[i % length];
      twInstance
        .to(
          {
            x: o.x,
            y: o.y,
            z: o.z,
          },
          1000
        )
        .easing(TWEEN.Easing.Exponential.In)
        // .delay(delay * Math.random())
        .start();
    });
  };

  const render = () => {
    camera.lookAt(scene.position);
    geometry.verticesNeedUpdate = true;
    geometry.colorsNeedUpdate = true;

    TWEEN.update();
    renderer.render(scene, camera);
  };
  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    init();
    window.addEventListener("resize", onWindowResize);
  }, []);
  return <div className="screen_wrapper content" id="screen"></div>;
};
