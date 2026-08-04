import React, { useMemo, useState } from "react";

const initialPolicies = [
  { id: 1, holder: "John Doe", type: "Health", premium: 1200, status: "Active" },
  { id: 2, holder: "Alice Smith", type: "Life", premium: 2400, status: "Pending" },
];

export default function Policies() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ holder:"", type:"Health", premium:"", status:"Active" });
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => policies.filter(p =>
    (filter==="All" || p.status===filter) &&
    (p.holder.toLowerCase().includes(search.toLowerCase()) ||
     p.type.toLowerCase().includes(search.toLowerCase()))
  ), [policies, search, filter]);

  const pages = Math.max(1, Math.ceil(filtered.length/perPage));
  const current = filtered.slice((page-1)*perPage, page*perPage);

  const save = () => {
    if (!form.holder || !form.premium) return;
    if (editId) {
      setPolicies(policies.map(p=>p.id===editId?{...p,...form,premium:Number(form.premium)}:p));
      setEditId(null);
    } else {
      setPolicies([...policies,{id:Date.now(),...form,premium:Number(form.premium)}]);
    }
    setForm({ holder:"", type:"Health", premium:"", status:"Active" });
  };

  const edit = p => { setEditId(p.id); setForm({...p}); };
  const del = id => setPolicies(policies.filter(p=>p.id!==id));

  return (
    <div style={{background:"#111827",color:"#fff",minHeight:"100vh",padding:24,fontFamily:"Arial"}}>
      <h2>Insurance Policies</h2>
      <p>Total Policies: <b>{policies.length}</b></p>

      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={filter} onChange={e=>{setFilter(e.target.value);setPage(1);}}>
          <option>All</option><option>Active</option><option>Pending</option><option>Expired</option>
        </select>
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        <input placeholder="Holder" value={form.holder} onChange={e=>setForm({...form,holder:e.target.value})}/>
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option>Health</option><option>Life</option><option>Vehicle</option><option>Home</option>
        </select>
        <input type="number" placeholder="Premium" value={form.premium} onChange={e=>setForm({...form,premium:e.target.value})}/>
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option>Active</option><option>Pending</option><option>Expired</option>
        </select>
        <button onClick={save}>{editId?"Update":"Add"} Policy</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr><th>ID</th><th>Holder</th><th>Type</th><th>Premium</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
        {current.map(p=>(
          <tr key={p.id}>
            <td>{p.id}</td><td>{p.holder}</td><td>{p.type}</td><td>${p.premium}</td><td>{p.status}</td>
            <td>
              <button onClick={()=>edit(p)}>Edit</button>{" "}
              <button onClick={()=>del(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <div style={{marginTop:16}}>
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
        <span style={{margin:"0 10px"}}>{page}/{pages}</span>
        <button disabled={page===pages} onClick={()=>setPage(page+1)}>Next</button>
      </div>
    </div>
  );
}
