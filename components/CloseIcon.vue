<template>
  <svg role="img" viewBox="0 0 50 50">
    <g>
      <polygon
        points="50,5 45,0 25,20 5,0 0,5 20,25 0,45 5,50 25,30 45,50 50,45 30,25"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CloseIcon extends Vue {};
</script>