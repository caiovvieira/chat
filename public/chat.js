const room = window.location.pathname.replace(/\//g, '')
const socket = io(`http://localhost:3000/${room}`)

let user = null

socket.on("update_messages", (messages)=>{
    updateMessagesOnScrren(messages)
})

function updateMessagesOnScrren(messages) {
    const div_messages = document.querySelector("#messages")

    let list_messages = '<ul>'
    messages.forEach(message => {
        list_messages += `<li>${message.user}: ${message.msg}</li>`
    });
    list_messages += '</ul>'

    div_messages.innerHTML = list_messages
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("#message_form")
    form.addEventListener("submit", (e)=>{
        e.preventDefault()

        if (!user) {
            alert("defina um usuario")
            return
        }

        const message = document.forms['message_form']['message'].value
        document.forms['message_form']['message'].value = ''
        socket.emit("new_message", {user:user, msg: message})
    })
})

const user_form = document.querySelector("#user_form")
user_form.addEventListener("submit", (e)=>{
    e.preventDefault()
    user = document.forms['user_form']['user'].value
    user_form.parentNode.removeChild(user_form)
})




