<template>
  <div>
    <b-container fluid class="">
      <b-row>
        <b-col lg="12" class="">
          <div v-if="githubRepos">
            <div>
              <b-card class="m-3">
                <b-table
                  id="my-table"
                  responsive
                  :busy.sync="isBusy"
                  :items="myProvider"
                  :per-page="perPage"
                  :fields="fields"
                  :current-page="currentPage"
                  small
                  class="text-nowrap"
                  @row-clicked="myRowClickHandler"
                  lazy
                >
                  <template #cell(_id)="data">
                    <div id="_id">
                      <p class="mb-1 ellipsis" id="_id">
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                  <template #cell(firstName)="data">
                    <div id="firstName">
                      <p
                        class="mb-1 ellipsis"
                        v-b-popover.hover.top="
                          data.value.length > 26 ? data.value.length : ''
                        "
                      >
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                  <template #cell(lastName)="data">
                    <p
                      class="mb-1 ellipsis"
                      id="lastName"
                      v-b-popover.hover.top="
                        data.value.length > 26 ? data.value : ''
                      "
                    >
                      {{ data.value }}
                    </p>
                  </template>
                  <template #cell(username)="data">
                    <p
                      class="mb-1 ellipsis"
                      id="username"
                      style="cursor: pointer"
                      v-b-popover.hover.top="
                        data.value.length > 26 ? data.value : ''
                      "
                    >
                      {{ data.value }}
                    </p>
                  </template>
                  <template #cell(timestamp)="data">
                    <div>
                      <p class="mb-1 ellipsis" id="timestamp">
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                  <template #cell(ip)="data">
                    <div>
                      <p class="mb-1 ellipsis" id="timestamp">
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                  <template #cell(createdDate)="data">
                    <div>
                       <p class="mb-1 ellipsis" id="timestamp">
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                  <template #cell(logoutTime)="data">
                    <div>
                       <p class="mb-1 ellipsis" id="logoutTime">
                        {{ data.value }}
                      </p>
                    </div>
                  </template>
                </b-table>
              </b-card>
            </div>
            <!-- <div class="mb-4" v-if="count > 10">
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                align="right"
                class="mb-0 justify-content-center trackresponse-pagination"
              ></b-pagination>
            </div> -->
            <div v-if="items.length == 0">
              <div class="bg-white mx-auto pb-3 text-center">
                <img
                  src="../assets/minds/loading.gif"
                  class="img-fluid mt-5 mx-auto pt-5"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="bg-white mx-auto pb-3 text-center">
              <img
                src="../assets/minds/drips.svg"
                width="190px"
                class="img-fluid mt-5 mx-auto pt-4"
              />
              <h5 class="d-block text-black-50 mt-4">
                No data found under the last 30 days
              </h5>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-sidebar id="sidebar-1" title="Sidebar" right shadow>
        <div class="px-3 py-2">
          <p>{{ details }}</p>
          <b-img
            src="https://picsum.photos/500/500/?image=54"
            fluid
            thumbnail
          ></b-img>
        </div>
      </b-sidebar>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "TrackRepos",
  data() {
    return {
      isBusy: false,
      currentPage: 1,
      perPage: 10,
      githubRepos: true,
      items: [],
      offset: 0,
      page: 0,
      range: "",
      count: 0,
      fields: [
        {
          key: "_id",
          label: "id",
        },
        {
          key: "firstName",
          label: "firstName",
        },
        {
          key: "lastName",
          label: "lastName",
        },
        {
          key: "username",
          label: "userName",
        },
        {
          key: "timestamp",
          label: "TimeStamp",
        },
        {
          key: "ip",
          label: "IP Address",
        },
        {
          key: "createdDate",
          label: "createdDate",
        },
        {
          key :"logoutTime",
          label:"logoutTime"
        }
      ],
      details: {},
    };
  },
  computed: {
    rows: function() {
      return this.count;
    },
  },
  methods: {
    // Get the email by respective user
    myProvider(ctx, callback) {
      window.ctx = ctx;
      window.callback = callback;
      this.isBusy = true;
      if (this.page > ctx.currentPage)
        this.offset = this.offset - ctx.perPage * (this.page - ctx.currentPage);
      else {
        this.page = ctx.currentPage;
        this.offset = ctx.perPage * (ctx.currentPage - 1);
      }

      this.getURL('/audit')
        .then((response) => {
          // Pluck the array of items off our axios response
          if (response.data.length) {
            this.count = response.data.length;
            this.githubRepos = true;
            this.items = [];
            this.page = ctx.currentPage;
            response.data.forEach((repos) => {
              var repoInfo = {};
              repoInfo._id = repos._id;
              repoInfo.firstName = repos.firstName;
              repoInfo.lastName = repos.lastName;
              repoInfo.username = repos.username;
              repoInfo.timestamp = repos.timestamp;
              repoInfo.ip = repos.ip;
              repoInfo.createdDate = repos.createdDate;
              repoInfo.logoutTime=repos.logoutTime;
              this.items.push(repoInfo);
            });
            this.isBusy = false;
            callback(this.items);
          } else {
            this.githubRepos = false;
          }
          // Provide the array of items to the callback
        })
        .catch(() => {
          this.isBusy = false;
          // eslint-disable-next-line standard/no-callback-literal
          callback([]);
        });

      // Must return null or undefined to signal b-table that callback is being used
      return null;
    },

    /**
     * Its redirected open with new tab
     * @param {String} value Its github repo link
     */
    openLink(value) {
      window.open(value, "_blank");
    },

    myRowClickHandler(record, index, event) {
      this.details = record;
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      console.log(event, "myRowClickHandler----->", record); // This will be the item data for the row
      console.log("partular element", event.target.id);
      console.log(
        "particular row data------------->",
        event.path[2].childNodes
      );
    },
  },
};
</script>
