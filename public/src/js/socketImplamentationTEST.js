/**
 * Created by Kvaba on 2/26/2019.
 */


function handelSocketMessage(msg) {
    if (msg['type'] && msg['type'] == 'connect') {
        $('#noPaper-' + msg.location.device).css('display', 'none')
        if (msg.location.status) {

            $('.card', `#${msg.location.device}`).removeClass('text-white bg-danger')
            $('.btn-reports', `#${msg.location.device}`).removeAttr('disabled')
            $('.btn-success', `#${msg.location.device}`).removeClass('disabled')
            $('.status', `#${msg.location.device}`).html('  <span class="badge badge-success">РАБОТИ</span>')
        } else {
            $('.card', `#${msg.location.device}`).addClass('text-white bg-danger')
            $('.btn-reports', `#${msg.location.device}`).attr('disabled')
            $('.btn-success', `#${msg.location.device}`).addClass('disabled')
            $('.status', `#${msg.location.device}`).html(' <span class="badge badge-danger">НЯМА ВРЪЗКА</span>')
        }

       //makeButton(msg.location.device, clickHandler)
    } else if (msg['type'] && msg['type'] == 'noPaper') {
        console.log('MO PAPER ', msg)
        $('#noPaper-' + msg.location.device).css('display', 'block')
        /*  $('#button-wrapper').prepend(`<div class="col-12">Client entered at: ` + Date() + `</div>`)*/
    }
}


