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

gsap.config({
    autoSleep: 60,
    force3D: false,
    nullTargetWarn: false,
});
gsap.registerPlugin(ScrollTrigger)
const ringArea = document.getElementById('ring-area-2')
console.log(ringArea);

async function setupViewer2() {
    const viewer2 = new ViewerApp({
        canvas: document.getElementById('canvas-2') as HTMLCanvasElement,
        useRgbm: false,
        isAntialiased: true
    })

    // Adding plugins
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

    await manager.addFromPath("./model/ring09.glb")
    const controls = viewer2.scene.activeCamera.controls;
    viewer2.scene.activeCamera.setCameraOptions({zoom: 0.8})
    console.log(controls);
    if (controls) {
        controls.autoRotate = true;
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.autoRotateSpeed = 1;

    }

    const camViewPlugin = viewer2.getPlugin(CameraViewPlugin)
    camViewPlugin?.camViews[0].focusView()

    const camera = viewer2.scene.activeCamera
    const position = camera.position
    const target = camera.target

    let needsUpdate = true;
    onUpdate()

    function setupScrollAnimation() {
        const timeLine = gsap.timeline()
        timeLine
            .to(position, {
                x: camViewPlugin?.camViews[1].position.x,
                y: camViewPlugin?.camViews[1].position.y,
                z: camViewPlugin?.camViews[1].position.z,
                scrollTrigger: {
                    trigger: '.section-2',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                    immediateRender: false,
                }, onUpdate
            })
            .to(target, {
                x: camViewPlugin?.camViews[1].target.x,
                y: camViewPlugin?.camViews[1].target.y,
                z: camViewPlugin?.camViews[1].target.z,
                scrollTrigger: {
                    trigger: '.section-2',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                    immediateRender: false,
                }, onUpdate
            })
            .to(position, {
                x: camViewPlugin?.camViews[2].position.x,
                y: camViewPlugin?.camViews[2].position.y,
                z: camViewPlugin?.camViews[2].position.z,
                scrollTrigger: {
                    trigger: '.section-3',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                    immediateRender: false,

                }, onUpdate
            })
            .to(target, {
                x: camViewPlugin?.camViews[2].target.x,
                y: camViewPlugin?.camViews[2].target.y,
                z: camViewPlugin?.camViews[2].target.z,
                scrollTrigger: {
                    trigger: '.section-3',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                    immediateRender: false,
                }, onUpdate
            })
    }
    setupScrollAnimation()
    function onUpdate() {
        needsUpdate = true
        // viewer.renderer.updateDirty()
        viewer2.setDirty()
    }

    viewer2.addEventListener('preFrame', () => {
        if (needsUpdate) {
            camera.positionTargetUpdated(true)
            needsUpdate = false
        }
    })
}

setupViewer2().then()


ScrollTrigger.create({
    trigger: '.section-1',
    pin: '#ring-area-2',
    start: 'center center',
    endTrigger: '.section-3',
    end: 'top top',
    scrub: 1
})


