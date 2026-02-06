import React, { useRef } from 'react'
import { IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, useIonAlert, IonNote, useIonToast, IonLoading } from '@ionic/react'
import { trash, pencil, logoGithub } from 'ionicons/icons'
import { useRepos } from '../context/RepoContext'

interface RepoItemProps {
  repo: { id: number; name: string; description: string; language: string; owner: string }
}

const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  const { removeRepo, editRepo, loading } = useRepos()
  const [presentAlert] = useIonAlert()
  const [presentToast] = useIonToast()
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const notify = (message: string, color: string) => {
    presentToast({ message, duration: 2000, color, position: 'bottom' })
  }

  const handleDelete = () => {
    presentAlert({
      header: 'Confirmar eliminación',
      message: `¿Borrar "${repo.name}" permanentemente de GitHub?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => slidingRef.current?.close() },
        { 
          text: 'Eliminar', 
          role: 'destructive', 
          handler: async () => {
            try {
              await removeRepo(repo.owner, repo.name)
              notify('Repositorio eliminado', 'success')
            } catch (e) {
              notify('Error al eliminar', 'danger')
            } finally {
              slidingRef.current?.close()
            }
          } 
        }
      ]
    })
  }

  const handleEdit = () => {
    presentAlert({
      header: 'Editar repositorio',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre', value: repo.name },
        { name: 'description', type: 'textarea', placeholder: 'Descripción', value: repo.description }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => slidingRef.current?.close() },
        { 
          text: 'Guardar', 
          handler: async (data) => {
            try {
              await editRepo(repo.owner, repo.name, data)
              notify('Cambios guardados', 'success')
            } catch (e) {
              notify('Error al actualizar', 'danger')
            } finally {
              slidingRef.current?.close()
            }
          } 
        }
      ]
    })
  }

  return (
    <>
      <IonLoading isOpen={loading} message="Procesando..." />
      <IonItemSliding ref={slidingRef}>
        <IonItem detail={false}>
          <IonIcon slot="start" icon={logoGithub} />
          <IonLabel>
            <h2 style={{ fontWeight: 'bold' }}>{repo.name}</h2>
            <p>{repo.description || 'Sin descripción'}</p>
            <p style={{ fontSize: '12px', color: 'gray' }}>Lenguaje: {repo.language || 'N/A'}</p>
          </IonLabel>
          <IonNote slot="end">{repo.owner}</IonNote>
        </IonItem>

        <IonItemOptions side="end">
          <IonItemOption color="primary" onClick={handleEdit}>
            <IonIcon slot="icon-only" icon={pencil} />
          </IonItemOption>
          <IonItemOption color="danger" onClick={handleDelete}>
            <IonIcon slot="icon-only" icon={trash} />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </>
  )
}

export default RepoItem