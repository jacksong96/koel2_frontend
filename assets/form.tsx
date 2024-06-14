"use client";

export default function Form() {
  return (
    <form className="flex-1">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold pb-3">Audio File Details</h1>
        <div className="flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 hover:text-red-400">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Save
          </button>
        </div>
      </div>
      <span className="grid gap-3">
        <p className="text-base pb-8 font-normal text-gray-500">
          Add information regarding audio or video data.
        </p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-black">
          <div className="sm:col-span-4">
            <label
              htmlFor="Title"
              className="block text-sm font-medium leading-6"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                className="block flex-1 rounded-md border-0 pl-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                placeholder="Give your file a name"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium leading-6"
            >
              Latitude
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="latitude"
                id="latitude"
                className="block w-full rounded-md border-0 pl-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                placeholder="1.3072"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium leading-6"
            >
              Longitude
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="longitude"
                id="longitude"
                className="block w-full rounded-md border-0 pl-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                placeholder="103.7906"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="start"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Start
            </label>
            <div className="mt-2 flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="startdate"
                  className="block text-sm font-normal leading-6 text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="startdate"
                  id="startdate"
                  className="block w-full mt-2 rounded-md border-0 text-center py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="starttime"
                  className="block text-sm font-normal leading-6 text-gray-700"
                >
                  Time
                </label>
                <input
                  type="time"
                  name="starttime"
                  id="starttime"
                  className="block w-full mt-2 rounded-md border-0 text-center py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="end"
              className="block text-sm font-medium leading-6"
            >
              End
            </label>
            <div className="mt-2 flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="enddate"
                  className="block text-sm font-normal leading-6 text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="enddate"
                  id="enddate"
                  className="block w-full mt-2 rounded-md border-0 text-center py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="endtime"
                  className="block text-sm font-normal leading-6 text-gray-700"
                >
                  Time
                </label>
                <input
                  type="time"
                  name="endtime"
                  id="endtime"
                  className="block w-full mt-2 rounded-md border-0 text-center py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        
      </span>
    </form>
  );
}
