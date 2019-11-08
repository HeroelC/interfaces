"use strict";

document.addEventListener('DOMContentLoaded', () => {

    let skeletonContent = document.getElementById('skeleton-content');
    let skeleton = document.getElementById('skeleton');

    skeletonContent.onmousemove = (e) => {
        skeleton.style.left = e.clientX + 'px';
        skeleton.style.top = e.clientY + 'px';
    }
});