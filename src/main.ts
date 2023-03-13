import './styles/style.scss'
import './styles/index.scss'
import './styles/null.scss'
import gsap from "gsap";

import {ScrollTrigger} from "gsap/ScrollTrigger";
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
} from "webgi";

gsap.registerPlugin(ScrollTrigger)
const arrow = document.querySelector('.arrow')!
const section01 = document.querySelector('.section-1')!
arrow.addEventListener('click', ()=> {
    console.log('arrow')
    section01.scrollIntoView()
})
async function setupViewer() {
    const viewer = new ViewerApp({
        canvas: document.getElementById('hero-canvas') as HTMLCanvasElement,
    })
    const canvas = document.getElementById('hero-canvas')
    canvas?.addEventListener('scroll', (e) => {
            e.preventDefault()
            console.log(e.type);
        }
    )

    // Adding plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(DiamondPlugin)
    await viewer.addPlugin(CameraViewPlugin)
    await viewer.addPlugin(BloomPlugin)
    await viewer.addPlugin(CanvasSnipperPlugin)
    await viewer.addPlugin(new TonemapPlugin(true))
    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./model/ring08.glb")

    const controls = viewer.scene.activeCamera.controls;
    viewer.scene.activeCamera.setCameraOptions({zoom: 0.8})
    const camViewPlugin = viewer.getPlugin(CameraViewPlugin)
    camViewPlugin?.animateAllViews()


    console.log(controls);
    // if (controls) {
    //     controls.autoRotate = true;
    //     controls.enableDamping = true;
    //     controls.autoRotateSpeed = 3;
    //     controls.enableZoom = false;
    // }
}
setupViewer().then()



