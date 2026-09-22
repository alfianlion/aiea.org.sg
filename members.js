/* AIEA member directory â€” render + live search
   Renders semantic rows that CSS displays as a table (desktop)
   or stacked cards with data-labels (mobile). Search filters
   across company, address, email, tel and fax.
*/
(function () {
  "use strict";

  var members = window.AIEA_MEMBERS || [];
  var listEl = document.getElementById("directory-list");
  var countEl = document.getElementById("directory-count");
  var emptyEl = document.getElementById("directory-empty");
  var searchEl = document.getElementById("member-search");
  if (!listEl) return;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function telLink(num) {
    var clean = num.replace(/[^\d+]/g, "");
    return '<a href="tel:' + esc(clean) + '">' + esc(num) + "</a>";
  }

  function rowHTML(m) {
    var tel = m.tel.length
      ? m.tel.map(telLink).join("<br>")
      : '<span class="muted-dash">â€”</span>';
    var email = m.email.length
      ? m.email.map(function (e) {
          return '<a href="mailto:' + esc(e) + '">' + esc(e) + "</a>";
        }).join("<br>")
      : '<span class="muted-dash">â€”</span>';
    var fax = m.fax
      ? esc(m.fax)
      : '<span class="muted-dash">â€”</span>';

    return (
      '<li class="directory-row">' +
        '<span class="col-no" data-label="No">' + m.no + "</span>" +
        '<span class="col-company" data-label="Company">' + esc(m.company) + "</span>" +
        '<span class="col-address" data-label="Address">' + esc(m.address) + "</span>" +
        '<span class="col-tel" data-label="Tel">' + tel + "</span>" +
        '<span class="col-email" data-label="Email">' + email + "</span>" +
        '<span class="col-fax" data-label="Fax">' + fax + "</span>" +
      "</li>"
    );
  }

  // Precompute lowercase haystack for each member
  members.forEach(function (m) {
    m._hay = (m.company + " " + m.address + " " + m.email.join(" ") + " " +
              m.tel.join(" ") + " " + m.fax).toLowerCase();
  });

  function render(list) {
    listEl.innerHTML = list.map(rowHTML).join("");
    var total = members.length;
    if (list.length === total) {
      countEl.textContent = total + " member companies";
    } else {
      countEl.textContent = list.length + " of " + total + " companies";
    }
    emptyEl.hidden = list.length !== 0;
  }

  render(members);

  if (searchEl) {
    var t;
    searchEl.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var q = searchEl.value.trim().toLowerCase();
        if (!q) { render(members); return; }
        var terms = q.split(/\s+/);
        var filtered = members.filter(function (m) {
          return terms.every(function (term) { return m._hay.indexOf(term) !== -1; });
        });
        render(filtered);
      }, 120);
    });
  }
})();