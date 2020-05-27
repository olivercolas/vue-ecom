<template>
  <v-snackbar
    :value="show"
    :multiLine="multiLine"
    :timeout="timeout"
    :bottom="bottom"
    :top="top"
    :vertical="vertical"
    :color="
      color !== '' ? color : null
    "
    @click="close()"
  >
    <v-spacer></v-spacer>
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';

@Component
export default class Snackbar extends Vue {
  @State(state => state.snackbar.show || false) show: boolean;
  @State(state => state.snackbar.multiLine) multiLine: boolean;
  @State(state => state.snackbar.timeout) timeout: number;
  @State(state => state.snackbar.bottom) bottom: boolean;
  @State(state => state.snackbar.top) top: boolean;
  @State(state => state.snackbar.vertical) vertical: boolean;
  @State(state => state.snackbar.color) color: string;
  @State(state => state.snackbar.message) message: string;
  @Action('snackbar/close') close: Function
}
</script>