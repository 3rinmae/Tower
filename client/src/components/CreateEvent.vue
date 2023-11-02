<template>
  <div class="modal fade" id="createEventFormModal" tabindex="-1" aria-labelledby="create event form" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title text-black fs-5" id="create new event">Create New Event</h1>
          <button type="button" role="button" class="btn-close" data-bs-dismiss="modal" title="close"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEvent()">
            <div>
              <input v-model="editable.name" placeholder="Event Name" type="text" class="form-control" id="name"
                maxlength="25" title="event name" aria-describedby="name" required>
            </div>
            <div>
              <input v-model="editable.coverImg" placeholder="Cover Image" type="url" class="form-control" id="coverImg"
                maxlength="1000" title="event cover image" aria-describedby="event cover image" required>
            </div>
            <div>
              <input v-model="editable.location" placeholder="Location" type="text" class="form-control" id="location"
                maxlength="50" title="location" aria-describedby="location" required>
            </div>
            <div>
              <input v-model="editable.capacity" placeholder="Total Capacity" type="number" class="form-control"
                id="capacity" min="1" max="100000" title="capacity" aria-describedby="capacity" required>
            </div>
            <div class="md-form md-outline input-with-post-icon datepicker d-flex align-items-center">
              <label class="w-75 " value="" for="startDate">Event Date</label>
              <input v-model="editable.startDate" data-mdb-toggle="datepicker" type="date" id="startDate"
                class="form-control" title="event date" aria-describedby="event date" required>
            </div>
            <div class="d-flex align-items-center">
              <label class="w-75" for="startDate">Category</label>
              <select v-model="editable.type" class="form-select" id="type" title="category" aria-label="category"
                required>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <div>
              <textarea v-model="editable.description" maxlength="1000" class="form-control" id="description" rows="3"
                title="event description" aria-describedby="event description" placeholder="Event Description"
                required></textarea>
            </div>
            <div class="text-end">
              <button class="btn btn-primary" role="button" title="create event submit" type="submit">Create
                Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { Modal } from "bootstrap";
import { router } from "../router";
import { useRouter } from "vue-router";
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    watchEffect(() => {
      editable.value = {}
    })
    return {
      account: computed(() => AppState.account),
      editable,
      categories: [
        "concert",
        "convention",
        "digital",
        "sport"
      ],
      async createEvent() {
        try {
          const eventData = editable.value
          const towerEvent = await eventsService.createEvent(eventData)
          Pop.success("Event Created!")
          editable.value = {}
          Modal.getOrCreateInstance('#createEventFormModal').hide()
          router.push({ name: "EventDetails", params: { towerEventId: towerEvent.id } })
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>