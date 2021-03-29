package com.example.wbdvsp2101vishwasthakkarserverjava.repositories;

import com.example.wbdvsp2101vishwasthakkarserverjava.models.Widget;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

// FIXME Do we need Id as long?
public interface WidgetRepository extends CrudRepository<Widget, Long> {

  @Query(value = "SELECT * FROM widgets WHERE topic_id=:tid", nativeQuery = true)
  public List<Widget> findWidgetsForTopic(@Param("tid") String topicId);
}
