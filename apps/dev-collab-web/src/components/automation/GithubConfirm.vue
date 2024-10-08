<template>
    <div>
      <h3>Step 3: Confirmation</h3>

      <div class="mb-4 overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border-b">Webhook URL</th>
              <td class="py-2 px-4 border-b">{{ url }}</td>
            </tr>
          </thead>
          <tbody >
            <tr>
              <th class="py-2 px-4 border-b">Rules</th>
              <td class="py-2 px-4 border-b">{{ rules }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="space-x-2 mb-4">
        <button @click="previous" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Previous
      </button>
        <button @click="save" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            SAVE
        </button>
      </div>
      <div v-if="showNotification" class="notification">Temp notification: Saved!</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        webhookUrl: '',
        showNotification: false
      };
    },
    props: {
      url: {
        type: String,
        required: true
      },
      rules: {
        type: Array as PropType<any[]>,
        required: true
      }
    },
    methods: {
      previous() {
        this.$emit('previous');
      },
      save() {
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
        this.$emit('save');
      }
    }
  });
  </script>


<style lang="scss" scoped>
@import '@/assets/styles.scss';

.custom-box {
  @apply bg-gray-100 p-4 rounded-lg;
  border: 1px solid $gray-2;
}

.custom-link {
  color: $accent-color;
  &:hover {
    text-decoration: underline;
  }
}

.responsive-text {
  font-size: 1rem;

  @include responsive(small) {
    font-size: 1.2rem;
  }

  @include responsive(medium) {
    font-size: 1.4rem;
  }

  @include responsive(large) {
    font-size: 1.6rem;
  }

  @include responsive(xlarge) {
    font-size: 1.8rem;
  }

  @include responsive(xxlarge) {
    font-size: 2rem;
  }
}

.bg-primary-color {
  background-color: $primary-color;
}
.bg-secondary-color {
  background-color: $secondary-color;
}
.bg-accent-color {
  background-color: $accent-color;
}
.bg-gray-1 {
  background-color: $gray-1;
}
.bg-gray-2 {
  background-color: $gray-2;
}
.bg-brown-1 {
  background-color: $brown-1;
}
.bg-pink-red-1 {
  background-color: $pink-red-1;
}
.bg-red-1 {
  background-color: $red-1;
}

.color-white {
  color: $vt-c-white;
}

.notification {
    position: fixed;
    left: 50%;
    background-color: #ef5350;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
  
  .notification.hidden {
    opacity: 0;
  }
</style>