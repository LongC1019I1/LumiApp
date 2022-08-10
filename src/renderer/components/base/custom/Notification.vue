<template>
  <span id="notification" class="pull-right">
    <i class="mdi mdi-bell-outline c-p" @click="isShowNotification=!isShowNotification"

    ></i>
    <div v-if="isHasNotifyNotRead" class="red-dot"></div>
    <modal
      @scrollBody="scrollBody"
      :show.sync="isShowNotification"
      :centered="false"
      :showClose="false"
      :isFade="false"
      @close="isShowNotification=false"
    >
      <div slot="header">
        <h4>
          <span>{{$t('header.notification.title')}}</span>
          <base-dropdown id="notificationDropdown" icon="mdi mdi-dots-horizontal" class="pull-right c-p" position="right">
            <span class="dropdown-item" @click="readAllNotify">
              <i class="mdi mdi-check-bold"></i>
              {{$t('header.notification.button.readAllNotify')}}
            </span>
          </base-dropdown>
        </h4>
      </div>
      <div
        v-for="(notifiesByDate, name) in notifiesListFilterByDate"
        :key="name"
        class="group-notification"
      >
        <h6 class="group-time mt-2">{{name}}</h6>
        <div
          v-for="notify in notifiesByDate"
          :key="notify.id"
          class="notification"
          :class="{'d-none':notify.is_hidden,
          'readed' :notify.is_read}"
          @click="clickNotify(notify)"
        >
          <div class="time">
            <span v-if="!notify.is_read" class="dot"></span>
            <span class="notification-time">{{notify.timer}}</span>
          </div>
          <p class="title text-overflow-hidden">{{notify.name}}</p>
          <p class="content" :class="{'compact':!notify.isShow}">{{notify.body}}</p>
        </div>
      </div>
    </modal>
  </span>
</template>
<script>
export default {
  name: "notification",
  data() {
    return {
      isShowNotification: false,
      notifyPage: 1,
      type: 2
    };
  },
  computed: {
    notifiesListFilterByDate,
    isHasNotifyNotRead
  },
  methods: {
    clickNotify,
    readAllNotify,
    scrollBody
  },
  created
};
//hook
function created() {
  $dispatch($api.Notify.getNotifyList, {
    size: this.notifyPage * 10,
    type: this.type
  });
}
//computed
function notifiesListFilterByDate() {
  return $getters["Notify/getNotifiesListFilterByDate"](this.type);
}
function isHasNotifyNotRead() {
  return $getters["Notify/isHasNotifyNotRead"](this.type);
}
//methods
function clickNotify(notify) {
  $commit("Notify/TOGGLE_SHOW_HIDE", notify);
  if (notify.is_read) return;
  $dispatch($api.Notify.readNotify, notify);
}
function readAllNotify(notify) {
  $dispatch($api.Notify.readAllNotify, { type: this.type });
}
function scrollBody(e, b) {

  if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
    $dispatch($api.Notify.getNotifyList, {
      size: ++this.notifyPage * 10,
      type: this.type
    });
  }
}
</script>
<style lang="scss">
#notification {
  position: relative;
  font-size: 40px;
  &>i{
    position: absolute;
    right: 1rem;
    top: -.8rem;
  }

  .mdi-bell-outline {
    position: absolute;
    right: 2rem;
    top: -0.4rem;
    font-size: 36px;
  }

  .red-dot {
    position: relative;
    height: 7px;
    width: 7px;
    top: -45px;
    right: -25px;
    z-index: 1000;
    border-radius: 50%;
    background-color: red;
  }
  .modal {
    background: transparent;
    animation: none;
    .modal-dialog {
      margin: 0px 0px 0px auto;
      top: 3.6rem;
      height: calc(100vh - 57px - 1rem);
      max-height: calc(100vh - 57px - 1rem);
      transform: none;
      transition: none;
      .modal-content {
        border-radius: 1rem;
        height: 100%;
        .modal-header {
          display: block;
          border: none;
        }
        .modal-body {
          padding-top: 0px;
          overflow: auto;
          margin-bottom: 1rem;
          padding-right: 0px;
          .group-notification {
            .notification {
              margin-top: 1rem;
              .dot {
                height: 10px;
                width: 10px;
                border-radius: 50%;
                display: inline-block;
              }
              .time {
                font-size: 1rem;
              }
              &.readed {
                opacity: 0.7;
              }
              p {
                margin: 0px;
                &.content {
                  white-space: pre-line;
                  &.compact {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* number of lines to show */
                    -webkit-box-orient: vertical;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
