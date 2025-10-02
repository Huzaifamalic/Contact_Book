// 📦 Supabase import
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Supabase credentials
const supabaseUrl = "https://aedwolaacbnmksawzvhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZHdvbGFhY2JubWtzYXd6dmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDEwNDYsImV4cCI6MjA3NDQ3NzA0Nn0.H4rbASkdViJt5_-ZRxKNXckYg_-3DvKWAx9pAaHRJJY";

const supabase = createClient(supabaseUrl, supabaseKey);

// 📂 DOM
const showcontact = document.getElementById("showcontact");

// 📜 Load Contacts
async function loadContacts() {
  const { data, error } = await supabase
    .from("Contact_Book_user_db")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("❌ Error:", error.message);
    showcontact.innerHTML = `<p class="text-danger text-center">Error loading contacts.</p>`;
    return;
  }

  if (data.length === 0) {
    showcontact.innerHTML = `<p class="text-muted text-center">No contacts found.</p>`;
    return;
  }

  showcontact.innerHTML = "";
  data.forEach((contact) => {
    showcontact.innerHTML += `
      <div class="col-md-6 mb-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>${contact.Name}</h5>
            <p><strong>📞:</strong> ${contact.Number}</p>
            <p><strong>📧:</strong> ${contact.Email}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-sm btn-outline-primary" onclick="openEdit('${contact.id}', '${contact.Name}', '${contact.Number}', '${contact.Email}')">✏️ Edit</button>
              <button class="btn btn-sm btn-outline-danger" onclick="deleteContact('${contact.id}')">🗑️ Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// 🗑️ Delete Contact
window.deleteContact = async function (id) {
  if (!confirm("Are you sure you want to delete this contact?")) return;

  const { error } = await supabase
    .from("Contact_Book_user_db")
    .delete()
    .eq("id", id);

  if (error) {
    alert("❌ Failed to delete contact.");
    console.error(error.message);
  } else {
    alert("🗑️ Contact deleted!");
    loadContacts();
  }
};

// ✏️ Open Edit Modal
window.openEdit = function (id, name, number, email) {
  document.getElementById("editId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editNumber").value = number;
  document.getElementById("editEmail").value = email;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
};

// 💾 Update Contact
window.updateContact = async function () {
  const id = document.getElementById("editId").value;
  const Name = document.getElementById("editName").value;
  const Number = document.getElementById("editNumber").value;
  const Email = document.getElementById("editEmail").value;

  const { error } = await supabase
    .from("Contact_Book_user_db")
    .update({ Name, Number, Email })
    .eq("id", id);

  if (error) {
    alert("❌ Failed to update contact.");
    console.error(error.message);
  } else {
    alert("✅ Contact updated!");
    const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    modal.hide();
    loadContacts();
  }
};

// 🚀 Load on start
document.addEventListener("DOMContentLoaded", loadContacts);
