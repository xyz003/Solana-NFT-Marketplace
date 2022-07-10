import React, { useEffect, useState } from "react"
import { XCircleIcon } from "@heroicons/react/outline"
// @ts-ignore
import { Divider } from "antd"
import { toast } from "react-toastify"

import { LoadingWidget } from "../loadingWidget"
import { Notification } from "../Notification"
import { useWallet } from "../../contexts/wallet"
import { BASE_URL_FLAG } from "../../constants/urls"
import { makeUrlStringFromObject } from "../../utils"

interface FlagNftProps {
  isModalOpen: boolean
  entity: string
  entity_id: string
  onCloseClick: () => void
}

interface flagData {
  entity_id: string
  entity_kind: string
  action: number
  description: string
}

export const FlagNft = ({
  isModalOpen,
  entity,
  entity_id,
  onCloseClick,
}: FlagNftProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")

  const { wallet } = useWallet()

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  const closeAndReset = () => {
    onCloseClick()
  }

  const flagCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    //@ts-ignore
    const authStorage: string = localStorage.getItem(
      `soloAuth${wallet?.publicKey?.toString()}`
    )
    const jwt: string = JSON.parse(authStorage)["jwt_token"]

    if (!jwt) {
      return
    }
    if (description.length === 0) {
      toast.error(
        <Notification
          title="An error as occurred trying to flag collection"
          description={`Please enter a reason for flagging this ${entity}`}
        />
      )
      return
    }
    setIsLoading(true)
    try {
      const payload: flagData = {
        entity_id: entity_id,
        entity_kind: entity,
        action: 1,
        description: description,
      }

      await fetch(`${BASE_URL_FLAG}?${makeUrlStringFromObject(payload)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        // body: JSON.stringify(payload),
      })
        .then(async (res) => {
          console.log("res", res)
          if (res.status === 200) {
            onCloseClick()
            toast.success(
              <Notification
                title={`${entity} flagged successfully`}
                description=""
              />
            )
          }
          setIsLoading(false)
          return res.json()
        })
        .then((data) => {
          if (data.message !== "marked as flagged") {
            toast.error(
              <Notification
                title="An error as occurred trying to flag collection"
                description={data.message}
              />
            )
          }
        })
    } catch (error) {
      console.log("err", error)
      setIsLoading(false)
      toast.error(
        <Notification
          title="An error as occurred trying to flag collection"
          description={error.message}
        />
      )
    }
  }

  return isModalOpen ? (
    <>
      <div
        onClick={closeAndReset}
        className="fixed w-full  bg-gray-900 opacity-70 left-0 top-0 z-50 cursor-pointer"
      />
      <div className="fixed w-full max-w-md transform rounded-t-md shadow -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50 flex-grow overflow-hidden">
        <div className="bg-gray-800 shadow-lg">
          <div className="grid grid-cols-2 px-4 py-5">
            <p className="justify-self-start font-bold">Flag Collection</p>{" "}
            <button onClick={closeAndReset} className="justify-self-end">
              <span className="flex items-center text-xxs">
                <XCircleIcon className="text-white h-6 w-6 mr-1 focus:outline-none" />
              </span>
            </button>
          </div>
          <Divider />
        </div>

        <form
          className="flex flex-col h-full p-5 bg-gray-800"
          onSubmit={flagCollection}
        >
          <label htmlFor="description">
            Enter reason for flagging collection
          </label>
          <textarea
            className="p-2 my-4 bg-gray-700 focus:outline-none"
            placeholder="Details"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-4">
            Report
          </button>
        </form>
        <div className="flex flex-col h-full p-5 bg-gray-800 pb-8 overflow-y-auto">
          {isLoading && (
            <div className="flex-1 justify-center">
              <div className="w-24 mx-auto">
                <LoadingWidget />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  ) : null
}
