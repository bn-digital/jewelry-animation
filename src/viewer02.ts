import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AssetManagerPlugin,
  BloomPlugin,
  CameraViewPlugin,
  CanvasSnipperPlugin,
  DiamondPlugin,
  GammaCorrectionPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  ViewerApp,
} from 'webgi'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.create({
  trigger: '.section-1',
  pin: '#ring-area-2',
  start: 'center center',
  endTrigger: '.section-3',
  end: 'top top',
  scrub: 1,
})

async function setupViewer02() {
  const viewer2 = new ViewerApp({
    canvas: document.getElementById('canvas-2') as HTMLCanvasElement,
  })

  const manager = await viewer2.addPlugin(AssetManagerPlugin)
  await viewer2.addPlugin(GBufferPlugin)
  await viewer2.addPlugin(new ProgressivePlugin(32))
  await viewer2.addPlugin(GammaCorrectionPlugin)
  await viewer2.addPlugin(DiamondPlugin)
  await viewer2.addPlugin(CameraViewPlugin)
  await viewer2.addPlugin(BloomPlugin)
  await viewer2.addPlugin(CanvasSnipperPlugin)
  await viewer2.addPlugin(new TonemapPlugin(true))

  viewer2.renderer.refreshPipeline()

  await manager.addFromPath('./model/ring09.glb')
  const controls = viewer2.scene.activeCamera.controls
  viewer2.scene.activeCamera.setCameraOptions({ zoom: 0.8 })

  if (controls) {
    controls.autoRotate = true
    // @ts-ignore
    controls.enableDamping = true
    // @ts-ignore
    controls.enableZoom = false
    // @ts-ignore
    controls.autoRotateSpeed = 1
  }

  const camViewPlugin = viewer2.getPlugin(CameraViewPlugin)
  camViewPlugin?.camViews[0].focusView()

  ScrollTrigger.create({
    trigger: '.section-1',
    start: 'top top',
    endTrigger: '.section-1',
    end: 'center center',
    onEnter: () => {
      camViewPlugin?.camViews[0].focusView()
    },
    onEnterBack: () => {
      camViewPlugin?.camViews[0].focusView()
    },
    scrub: 1,
  })

  ScrollTrigger.create({
    trigger: '.section-2',
    start: 'top center',
    endTrigger: '.section-2',
    end: 'top bottom',
    onEnter: () => {
      camViewPlugin?.camViews[1].focusView()
    },
    onEnterBack: () => {
      camViewPlugin?.camViews[0].focusView()
    },
    scrub: 1,
  })
  ScrollTrigger.create({
    trigger: '.section-3',
    start: 'top center',
    endTrigger: '.section-3',
    end: 'top bottom',
    onEnter: () => {
      camViewPlugin?.camViews[2].focusView()
    },
    onEnterBack: () => {
      camViewPlugin?.camViews[1].focusView()
    },
    scrub: 1,
  })
}
setupViewer02().then()
