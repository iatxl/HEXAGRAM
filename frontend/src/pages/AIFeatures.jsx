import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'

function AIFeatures() {
  const navigate = useNavigate()
  const [selectedFeature, setSelectedFeature] = useState(null) // 'memory-blend' | null
  const [tab, setTab] = useState('with-others')
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [prompt, setPrompt] = useState("")
  const [preset, setPreset] = useState("")
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState("")
  const [resultCaption, setResultCaption] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)

  const handleGenerate = async ()=>{
    try {
      setLoading(true)
      setResultUrl("")
      const form = new FormData()
      form.append('mode', tab)
      form.append('prompt', prompt)
      form.append('preset', preset)
      if (image1) form.append('image1', image1)
      if (tab==='with-others' && image2) form.append('image2', image2)
      const res = await axios.post(`${serverUrl}/api/ai/generate`, form, { withCredentials:true, headers:{ 'Content-Type':'multipart/form-data' } })
      setResultUrl(res.data.generatedImageUrl)
      setShowPostModal(true)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback((e, which)=>{
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (which === 1) setImage1(file);
    if (which === 2) setImage2(file);
  },[])

  const onPick = (e, which) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (which === 1) setImage1(file);
    if (which === 2) setImage2(file);
  }

  useEffect(()=>{
    const check = ()=> setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    check()
    window.addEventListener('resize', check)
    return ()=> window.removeEventListener('resize', check)
  },[])

  const renderUploadTile = (idx)=>{
    const hasImage = (idx===1 && image1) || (idx===2 && image2)
    const setImage = (file)=>{ if(idx===1) setImage1(file); else setImage2(file) }
    const clearImage = ()=> setImage(null)
    const commonProps = {
      className: 'glass-card mt-1 rounded-xl p-3 h-[180px] md:h-[220px] flex items-center justify-center text-white/70 border border-white/10 relative'
    }
    const dndProps = isMobile ? {} : {
      onDragOver: (e)=>{e.preventDefault(); e.currentTarget.classList.add('ring-2');},
      onDragLeave: (e)=>{e.preventDefault(); e.currentTarget.classList.remove('ring-2');},
      onDrop: (e)=>{ e.currentTarget.classList.remove('ring-2'); onDrop(e, idx); }
    }
    return (
      <div {...commonProps} {...dndProps}>
        {hasImage ? (
          <div className='w-full h-full relative'>
            <img
              src={URL.createObjectURL(idx===1?image1:image2)}
              alt={`preview-${idx}`}
              className='w-full h-full object-cover rounded-lg'
            />
            <button
              className='absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded'
              onClick={clearImage}
            >Remove</button>
          </div>
        ) : (
          <div className='text-center'>
            {!isMobile && <div className='mb-2'>Drag & drop image here</div>}
            <div className='text-white/50 text-xs mb-3'>{isMobile? 'Tap to upload' : 'or'}</div>
            <label className='cursor-pointer px-3 py-2 rounded-lg bg:white/10 bg-white/10 hover:bg-white/15 inline-block'>
              Browse
              <input type='file' accept='image/*' className='hidden' onChange={(e)=> onPick(e, idx)} />
            </label>
          </div>
        )}
      </div>
    )
  }

  const handlePostToFeed = async ()=>{
    if(!resultUrl) return;
    try{
      setLoading(true)
      const res = await fetch(resultUrl)
      const blob = await res.blob()
      const file = new File([blob], 'memory-blend.jpg', { type: blob.type || 'image/jpeg' })
      const form = new FormData()
      form.append('caption', resultCaption)
      form.append('mediaType', 'image')
      form.append('media', file)
      await axios.post(`${serverUrl}/api/post/upload`, form, {
        withCredentials: true,
        headers:{ 'Content-Type':'multipart/form-data' }
      })
      setResultCaption("")
      setShowPostModal(false)
      alert('Posted successfully')
      navigate('/')
    }catch(err){
      console.log(err)
      alert('Failed to post')
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='relative w-full min-h-screen bg-[#0b0b10] flex flex-col items-center justify-start overflow-hidden'>
      <div className='glow-blob glow-purple w-[60vw] h-[60vw] -top-[10%] -right-[10%] absolute opacity-70'></div>
      <div className='glow-blob glow-blue w-[55vw] h-[55vw] -bottom-[15%] -left-[10%] absolute opacity-60' style={{animationDelay:"-1.2s"}}></div>
      <div className='glow-blob glow-pink w-[35vw] h-[35vw] top-[20%] left-[10%] absolute opacity-60' style={{animationDelay:"-2.4s"}}></div>

      <div className='glass-card w-[92%] lg:max-w-[900px] mt-[40px] rounded-2xl p-[20px] text-white'>
        {!selectedFeature && (
          <div>
            <h1 className='text-2xl mb-4'>AI Features</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
              <div className='rounded-2xl p-4 glass-card text-left relative cursor-pointer hover:bg-white/5 transition-colors' onClick={() => setSelectedFeature('memory-blend')}>
                <div className='text-lg font-semibold'>Memory Blend</div>
                <div className='text-white/70 text-sm mt-1'>Blend memories with one or two photos using a prompt or preset.</div>
                <div className='absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold'>
                  Beta version
                </div>
              </div>

              <div className='rounded-2xl p-4 glass-card text-left relative'>
                <div className='text-lg font-semibold'>Stress Bot</div>
                <div className='text-white/70 text-sm mt-1'>Get personalized stress relief tips and relaxation techniques.</div>
                <div className='absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold'>
                  Coming Soon
                </div>
              </div>

              <div className='rounded-2xl p-4 glass-card text-left relative'>
                <div className='text-lg font-semibold'>Discount Near Me</div>
                <div className='text-white/70 text-sm mt-1'>Find the best deals and discounts in your local area.</div>
                <div className='absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold'>
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedFeature==='memory-blend' && (
        <>
        <div className='flex items-center justify-between mb-3'>
          <h1 className='text-2xl'>Memory Blend</h1>
          <button className='px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10' onClick={()=>{ setSelectedFeature(null); setResultUrl(""); }}>Back</button>
        </div>

        <div className='flex gap-2 mb-4'>
          <button className={`px-3 py-2 rounded-xl ${tab==='with-others'?'btn-spotlight':'bg-white/5 border border-white/10'}`} onClick={()=>setTab('with-others')}>With others</button>
          <button className={`px-3 py-2 rounded-xl ${tab==='self'?'btn-spotlight':'bg-white/5 border border-white/10'}`} onClick={()=>setTab('self')}>Self</button>
        </div>

        {tab==='with-others' && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
            {[1,2].map(idx=> (
              <div key={idx}>
                <label className='text-sm text-white/70'>Upload photo {idx}</label>
                {renderUploadTile(idx)}
              </div>
            ))}
          </div>
        )}

        {tab==='self' && (
          <div className='mb-3'>
            <label className='text-sm text-white/70'>Upload photo</label>
            {renderUploadTile(1)}
          </div>
        )}

        <div className='mb-3'>
          <label className='text-sm text-white/70'>Trending presets</label>
          <div className='flex flex-wrap gap-2 mt-1'>
            {['With mom','With dad','Besties','Travel','Wedding','Birthday','Retro','Cinematic'].map(p=> (
              <button key={p} className={`px-3 py-1 rounded-full text-sm ${preset===p?'btn-spotlight':'bg-white/5 border border-white/10'}`} onClick={()=>setPreset(p)}>{p}</button>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='text-sm text-white/70'>Custom prompt</label>
          <textarea className='modern-input w-full h-[90px] rounded-xl px-3 py-2' placeholder='Describe what to generate...' value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
        </div>

        <button className='px-4 py-3 rounded-xl btn-spotlight' onClick={handleGenerate} disabled={loading}>{loading?'Generating...':'Generate'}</button>

        {resultUrl && (
          <div className='mt-4'>
            <img src={resultUrl} alt='result' className='rounded-xl max-w-full' />
          </div>
        )}
        </>
        )}
      </div>
      {showPostModal && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-[200]'>
          <div className='glass-card w-[92%] max-w-[520px] rounded-2xl p-[16px] text-white'>
            <div className='flex items-center justify-between mb-2'>
              <div className='text-lg font-semibold'>Post to feed</div>
              <button className='text-white/60 hover:text-white' onClick={()=>setShowPostModal(false)}>Close</button>
            </div>
            {resultUrl && (
              <img src={resultUrl} alt='result' className='rounded-xl max-w-full mb-3' />
            )}
            <label className='text-sm text-white/70'>Caption</label>
            <textarea className='modern-input w-full h-[90px] rounded-xl px-3 py-2 mb-3' placeholder='Write a caption...' value={resultCaption} onChange={(e)=>setResultCaption(e.target.value)} />
            <div className='flex justify-end gap-2'>
              <button className='px-3 py-2 rounded-xl bg-white/5 border border-white/10' onClick={()=>setShowPostModal(false)}>Cancel</button>
              <button className='px-4 py-2 rounded-xl btn-spotlight' onClick={handlePostToFeed} disabled={loading}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIFeatures
