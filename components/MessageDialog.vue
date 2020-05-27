<template>
  <v-dialog
    :value="show"
    transition="slide-y-transition"
    content-class="message-dialog"
    @click:outside="close()"
  >
    <v-row justify="center" style="margin:0;">
      <v-card dark tile class="grid-container text-center" style="width: 100%;">
        <div class="card-exceed-close">
          <button type="button" @click="close()">
            <CloseIcon />
          </button>
        </div>
        <div class="card-exceed-icon">
          <InfoIcon />
        </div>
        <div class="card-exceed-title">{{ title }}</div>
        <div class="card-exceed-message">{{ description }}</div>
        <a :href="link.url" class="card-exceed-question">{{ link.text }}</a>
      </v-card>
    </v-row>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Link from '@/models/Link';
import InfoIcon from '@/components/InfoIcon.vue';
import CloseIcon from '@/components/CloseIcon.vue';
import { State, Action } from 'vuex-class';

@Component({
  components: {
    InfoIcon,
    CloseIcon
  }
})
export default class MessageDialog extends Vue {
  @State(state => state.messageDialog.show) show: boolean;
  @State(state => state.messageDialog.title) title: string;
  @State(state => state.messageDialog.description) description: string;
  @State(state => state.messageDialog.link) link: Link;
  @Action('messageDialog/close') close: Function;
}
</script>

<style lang="scss">
.message-dialog {
  border-radius: 0px;
  margin: 0 0 auto 0;
  .theme--dark.v-card {
    background-color: $messageBg;
  }
}
</style>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr minmax(20px, auto);
  grid-template-rows: 60px minmax(90px, auto) minmax(38px, auto) minmax(
      20px,
      auto
    );
  gap: 1px 1px;
  grid-template-areas:
    'card-exceed-icon card-exceed-close'
    'card-exceed-title .'
    'card-exceed-message .'
    'card-exceed-question .';

  padding: 0 20px 40px;
}

.card {
  &-exceed {
    &-close,
    &-icon,
    &-title,
    &-question,
    &-message {
      display: flex;
      align-items: center;
    }
    &-title,
    &-message {
      text-align: left;
    }
    &-icon {
      justify-content: flex-start;
    }
    &-close {
      button {
        fill: $cartSecondaryColor;
        height: 19px;
        width: 19px;
        padding: 0 2px;
      }
    }
    &-title {
      font-size: 1.6rem;
      line-height: 2rem;
    }
    &-message {
      color: $cartSecondaryColor;
      font-size: 0.9rem;
    }
    &-question {
      margin-top: 15px;
      &,
      &:hover,
      &:visited {
        color: $cartPrimaryColor;
        text-decoration: none;
      }
    }
  }
}

@media screen and (min-width: $sm) {
  .grid-container {
    grid-template-columns: 0.7fr 1.6fr 0.7fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'card-exceed-icon card-exceed-title card-exceed-close'
      '. card-exceed-message card-exceed-question';
    padding: 30px 40px;
  }

  .card {
    &-exceed {
      &-close,
      &-question {
        justify-content: flex-end;
      }
      &-title,
      &-message {
        padding-right: 20px;
      }
      &-message {
        margin: 20px 0;
      }
      &-question {
        margin-top: 0px;
      }
    }
  }
}

$cardClasses: 'close' 'icon' 'title' 'message' 'question';
@each $class in $cardClasses {
  .card-exceed-#{$class} {
    grid-area: card-exceed-#{$class};
  }
}
</style>