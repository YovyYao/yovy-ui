<template>
  <div>
    <yo-button type="primary" loading>Loading</yo-button>
    <yo-button type="primary" loading-icon="circle-notch" loading
      >Loading</yo-button
    >
    <yo-button type="primary" loading>
      <template #loading>
        <yo-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </yo-button>
  </div>
</template>